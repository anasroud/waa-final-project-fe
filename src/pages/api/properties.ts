import { NextApiRequest, NextApiResponse } from "next";
import propertiesData from "./properties.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	try {
		const {
			city,
			state,
			zipCode,
			minPrice,
			maxPrice,
			homeType,
			minBedrooms,
			maxBedrooms,
			page = "1",
			limit = "10",
		} = req.query;

		let filteredProperties = [...propertiesData];

		// Apply filters
		if (city) {
			filteredProperties = filteredProperties.filter(
				(property) =>
					property.city.toLowerCase() === String(city).toLowerCase()
			);
		}

		if (state) {
			filteredProperties = filteredProperties.filter(
				(property) =>
					property.state.toLowerCase() === String(state).toLowerCase()
			);
		}

		if (zipCode) {
			filteredProperties = filteredProperties.filter(
				(property) => property.zipCode === zipCode
			);
		}

		if (minPrice) {
			filteredProperties = filteredProperties.filter(
				(property) => property.price >= Number(minPrice)
			);
		}

		if (maxPrice) {
			filteredProperties = filteredProperties.filter(
				(property) => property.price <= Number(maxPrice)
			);
		}

		if (homeType) {
			filteredProperties = filteredProperties.filter(
				(property) =>
					property.homeType.toLowerCase() ===
					String(homeType).toLowerCase()
			);
		}

		if (minBedrooms) {
			filteredProperties = filteredProperties.filter(
				(property) => property.bedroomCount >= Number(minBedrooms)
			);
		}

		if (maxBedrooms) {
			filteredProperties = filteredProperties.filter(
				(property) => property.bedroomCount <= Number(maxBedrooms)
			);
		}

		// Pagination
		const pageNum = parseInt(String(page));
		const limitNum = parseInt(String(limit));
		const startIndex = (pageNum - 1) * limitNum;
		const endIndex = startIndex + limitNum;

		const paginatedProperties = filteredProperties.slice(
			startIndex,
			endIndex
		);
		const total = filteredProperties.length;

		res.status(200).json({
			properties: paginatedProperties,
			pagination: {
				total,
				page: pageNum,
				limit: limitNum,
				totalPages: Math.ceil(total / limitNum),
			},
		});
	} catch (error) {
		console.error("Error in properties API:", error);
		res.status(500).json({ message: "Internal server error" });
	}
}
