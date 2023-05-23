
import { Resolver, Mutation, Arg, Query, ID } from "type-graphql";
import { Country, CountryInput, CountryDelete } from "../entities/Country";
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



    @Mutation(() => Boolean, { nullable: true })
    async deleteCountry(@Arg("id", () => ID) id: number)
      : Promise<boolean> {
        
        
        const countryRepository = datasource.getRepository(Country);


      const country = await datasource
        .getRepository(Country)
        .findOne({ where: { id } });
        
      if (country === null) {
        throw new Error('Il n\'y a pas de d\'article pour cette recherche')
      }
      if (country.id != null) {
        const result =  await countryRepository.delete(country);;
        return result.affected !== 0;
      }
      else {
        throw new Error('Vous n\'êtes pas l\'auteur de cette article')
      }
  
    }

}
// @Mutation(() => Country, { nullable: true })
// async deleteCountry(@Arg("id", () => ID) id: number): Promise<boolean> {
//   const countryRepository = datasource.getRepository(Country);
//   const country = await countryRepository.findOne({ where: { id } });

//   if (country === null) {
//     throw new Error("Il n'y a pas d'article pour cette recherche");
//   }

//   await countryRepository.remove(country);

//   return true;
