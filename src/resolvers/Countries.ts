
import { Resolver, Mutation, Arg, Query, Authorized,  } from "type-graphql";
import { Country, CountryInput } from "../entities/Country";
import datasource from "../utils";

@Resolver()
export class CountriesResolver {
  @Authorized()
  @Mutation(() => Country)
  async createCountry(
    @Arg("data", () => CountryInput) data: CountryInput
  ): Promise<Country> {
    const newCountry = await datasource.getRepository(Country).save(data);

    return newCountry;
  }

  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return await datasource.getRepository(Country).find();
  }

  
}
