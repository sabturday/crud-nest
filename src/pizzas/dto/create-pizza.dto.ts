import { IsString } from "class-validator";

export class CreatePizzaDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly brand: string;
}
