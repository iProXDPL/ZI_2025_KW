export interface RoomInput {
    name: string;
    buildingId: string;
    floor: number;
}

export const validateRoomInput = (input: Partial<RoomInput>): string | null => {
    if (!input.name || !input.buildingId) {
        return "Nazwa sali i ID budynku są wymagane";
    }
    return null;
};

export const validateRoomFloor = (floor: number, maxFloors?: number): string | null => {
    if (maxFloors !== undefined && floor > maxFloors) {
        return `Piętro nie może być wyższe niż liczba pięter w budynku (${maxFloors})`;
    }
    return null;
}
