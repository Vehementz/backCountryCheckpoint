
import { Resolver, Mutation, Arg, Query, } from "type-graphql";
import { Country, CountryInput } from "../entities/Country";
import datasource from "../utils";

@Resolver()
export class CountriesResolver {
    @Mutation(() => Country)
    async createCountry(
        @Arg("data", () => CountryInput) data: CountryInput
    ): Promise<Country> {
        let code = data.code;
        code = code.toUpperCase();
        let name = data.name;
        name = name.charAt(0).toUpperCase() + name.slice(1);

        const emoji = data.emoji;
        const newCountry = await datasource.getRepository(Country).save({
            name,
            code,
            emoji

        });
        return newCountry;
    }

    @Query(() => [Country])
    async countries(): Promise<Country[]> {
        return await datasource.getRepository(Country).find();
    }


    @Query(() => [Country])
    async countriesByCode(
        @Arg("code") code: string): Promise<Country[]> {

        const countries = await datasource.getRepository(Country).find({where: { code: code.toUpperCase() }});
        return countries
    }

}

