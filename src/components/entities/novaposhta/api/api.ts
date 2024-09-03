import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CITY_SENDER = process.env.NEXT_PUBLIC_CITY_SENDER;

import type {
	City,
	Warehouse,
	DeliveryPrice,
	ResponsePrams,
} from "../model/type";

export const novaPoshtaApi = createApi({
	reducerPath: "novaPoshtaApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.novaposhta.ua/" }),
	endpoints: (builder) => ({
		getCity: builder.query<City[], { cityName: string }>({
			query: ({ cityName }) => {
				return {
					url: "v2.0/json/",
					method: "POST",
					body: {
						modelName: "Address",
						calledMethod: "getCities",
						methodProperties: {
							FindByString: cityName,
						},
					},
				};
			},
			transformResponse: (data: { data: City[] }) => {
				return data.data;
			},
		}),
		getWarehouses: builder.query<Warehouse[], { cityName: string }>({
			query: ({ cityName }) => ({
				url: "v2.0/json/",
				method: "POST",
				body: {
					modelName: "Address",
					calledMethod: "getWarehouses",
					methodProperties: {
						CityRef: cityName,
					},
				},
			}),
			transformResponse: (data: { data: Warehouse[] }) => {
				return data.data;
			},
		}),
		getDeliveryPrice: builder.query<DeliveryPrice, ResponsePrams>({
			query: ({ cityRef, cost = 0, weight = 1 }) => {
				return {
					url: "v2.0/json/",
					method: "POST",
					body: {
						modelName: "InternetDocument",
						calledMethod: "getDocumentPrice",
						methodProperties: {
							CitySender: CITY_SENDER,
							CityRecipient: cityRef,
							Weight: weight,
							ServiceType: "WarehouseWarehouse",
							Cost: cost,
							CargoType: "Cargo",
							SeatsAmount: "1",
							PackCount: "1",
							PackType: "Package",
							PackDescription: "Goods",
							volumetricWidth: 40,
							volumetricLength: 40,
							volumetricHeight: 5,
						},
					},
				};
			},
			transformResponse: (data: { data: DeliveryPrice[] }) => {
				return data.data[0];
			},
		}),
	}),
});

export const {
	useLazyGetCityQuery,
	useLazyGetWarehousesQuery,
	useLazyGetDeliveryPriceQuery,
} = novaPoshtaApi;
