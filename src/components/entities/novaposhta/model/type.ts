export interface ResponsePrams {
	cityRef: string;
	cost?: number;
	weight?: number;
}

export interface DeliveryPrice {
	AssessedCost: number;
	Cost: number;
}

export interface City {
	Area: string;
	AreaDescription: string;
	AreaDescriptionRu: string;
	CityID: string;
	Delivery1: string;
	Delivery2: string;
	Delivery3: string;
	Delivery4: string;
	Delivery5: string;
	Delivery6: string;
	Delivery7: string;
	Description: string;
	DescriptionRu: string;
	IsBranch: string;
	PreventEntryNewStreetsUser: string;
	Ref: string;
	SettlementType: string;
	SettlementTypeDescription: string;
	SettlementTypeDescriptionRu: string;
	SpecialCashCheck: number;
}

export interface Warehouse {
	BeaconCode: string;
	BicycleParking: string;
	CanGetMoneyTransfer: string;
	CategoryOfWarehouse: string;
	CityDescription: string;
	CityDescriptionRu: string;
	CityRef: string;
	Delivery: DeliverySchedule;
	DenyToSelect: string;
	Description: string;
	DescriptionRu: string;
	Direct: string;
	DistrictCode: string;
	GeneratorEnabled: string;
	HasFittingRoom: string;
	HasMirror: string;
	InternationalShipping: string;
	Latitude: string;
	Longitude: string;
	MaxDeclaredCost: string;
	Number: string;
	OnlyReceivingParcel: string;
	POSTerminal: string;
	PaymentAccess: string;
	Phone: string;
	PlaceMaxWeightAllowed: string;
	PostFinance: string;
	PostMachineType: string;
	PostalCodeUA: string;
	PostomatFor: string;
	ReceivingLimitationsOnDimensions: Dimensions;
	Reception: DeliverySchedule;
	Ref: string;
	RegionCity: string;
	Schedule: DeliverySchedule;
	SelfServiceWorkplacesCount: string;
	SendingLimitationsOnDimensions: Dimensions;
	SettlementAreaDescription: string;
	SettlementDescription: string;
	SettlementRef: string;
	SettlementRegionsDescription: string;
	SettlementTypeDescription: string;
	SettlementTypeDescriptionRu: string;
	ShortAddress: string;
	ShortAddressRu: string;
	SiteKey: string;
	TotalMaxWeightAllowed: string;
	TypeOfWarehouse: string;
	WarehouseForAgent: string;
	WarehouseIllusha: string;
	WarehouseIndex: string;
	WarehouseStatus: string;
	WarehouseStatusDate: string;
	WorkInMobileAwis: string;
}

export interface DeliverySchedule {
	Monday: string;
	Tuesday: string;
	Wednesday: string;
	Thursday: string;
	Friday: string;
	Saturday: string;
	Sunday: string;
}

export interface Dimensions {
	Height: number;
	Length: number;
	Width: number;
}
