export interface BuildingInput {
    name: string;
    description: string;
    address: string;
    floors: number;
}

export const validateBuildingInput = (input: Partial<BuildingInput>): string | null => {
    if (!input.name) {
        return "Nazwa budynku jest wymagana";
    }
    return null;
};
