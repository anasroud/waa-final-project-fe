import { NextApiRequest, NextApiResponse } from "next";
import offersData from "./offers.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	try {
		const {
			propertyId,
			customerId,
			minOfferedPrice,
			maxOfferedPrice,
			isAccepted,
			page = "1",
			limit = "10",
		} = req.query;

		let filteredOffers = [...offersData];

		// Apply filters
		if (propertyId) {
			filteredOffers = filteredOffers.filter(
				(offer) => offer.property.id === Number(propertyId)
			);
		}

		if (customerId) {
			filteredOffers = filteredOffers.filter(
				(offer) => offer.customer.id === Number(customerId)
			);
		}

		if (minOfferedPrice) {
			filteredOffers = filteredOffers.filter(
				(offer) => offer.offeredPrice >= Number(minOfferedPrice)
			);
		}

		if (maxOfferedPrice) {
			filteredOffers = filteredOffers.filter(
				(offer) => offer.offeredPrice <= Number(maxOfferedPrice)
			);
		}

		if (isAccepted !== undefined) {
			const isAcceptedBool = String(isAccepted).toLowerCase() === "true";
			filteredOffers = filteredOffers.filter(
				(offer) => offer.isAccepted === isAcceptedBool
			);
		}

		// Pagination
		const pageNum = parseInt(String(page));
		const limitNum = parseInt(String(limit));
		const startIndex = (pageNum - 1) * limitNum;
		const endIndex = startIndex + limitNum;

		const paginatedOffers = filteredOffers.slice(startIndex, endIndex);
		const total = filteredOffers.length;

		res.status(200).json({
			offers: paginatedOffers,
			pagination: {
				total,
				page: pageNum,
				limit: limitNum,
				totalPages: Math.ceil(total / limitNum),
			},
		});
	} catch (error) {
		console.error("Error in offers API:", error);
		res.status(500).json({ message: "Internal server error" });
	}
}
