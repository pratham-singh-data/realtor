import { Box, Flex, Select } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { filterData, getFilterValues } from "../utils/filterData";

export const SearchFilters = () => {
    const [filters, setFilters] = useState(filterData);
    const router = useRouter();

    const searchProperties = (filterValues) => {
        const path = router.pathname;
        const { query } = router;

        const values = getFilterValues(filterValues);
        values.forEach((item) => {
            if(item.value && filterValues?.[item.name]){
                query[item.name] = item.value;
            }
        })

        router.push({ pathname: path, query: query });
    }

    return(
        <Flex bg="gray.100" justifyContent="center" p="4" flexWrap="wrap">
            {filters.map((filter) => {
                return(
                    <Box key={filter.queryName}>
                        <Select placeholder={filter.placeholder} p="2" w="fit-content" onChange={(ev) => searchProperties({[filter.queryName]: ev.target.value})} >
                        {filter?.items?.map((item) => (
                            <option value={item.value} key={item.value}>
                                {item.name}
                            </option>
                        ))}
                        </Select>
                    </Box>
                )
            })}
        </Flex>
    )
}