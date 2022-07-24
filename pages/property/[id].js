import ImageScrollbar from "../../components/ImageScrollbar";
import { GoVerified } from "react-icons/go";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react"
import { fetchApi, baseUrl } from "../../utils/fetchApi"
import { FaBath, FaBed } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import millify from "millify";

const PropertyDetails = ({ propertyDetails: {price, rentFrequency, rooms, title, baths, agency, isVerified, area, description, type, purpose, furnishingStatus, amenities, photos} }) => (
    <Box maxWidth="1000px" margin="autoo" p="4">
        {photos && <ImageScrollbar data={photos}/>}

        <Box w="full" p="6">
            <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
                    <Flex alignItems="center">
                        <Box paddingRight="3" color="green.400">
                            {isVerified && <GoVerified/>}
                        </Box>
                        <Text fontWeight="bold" fontSize="lg">AED {millify(price)} {rentFrequency && `${rentFrequency}`} </Text>
                    </Flex>
                </Flex>

                <Box>
                    <Avatar size="sm" src={agency?.logo?.url}/>
                </Box>

                <Flex alignItems="center" p="1" justifyContent="space-between" w="250px" color="blue.400">
                    {rooms} <FaBed/> | <FaBath/> | { millify(area) } sqft <BsGridFill/>
                </Flex>

                <Box marginTop="2" fontType="lg" fontWeight="bold">
                    <Text fontSize="lg">
                        {`${title}`}
                    </Text>

                    <Text lineHeight="2" color="gray.600">{description}</Text>
                </Box>

                <Flex flexWrap="wrap" textTransform="uppercase" justifyContent="space-between">
                    <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">
                        <Text>Type</Text>
                        <Text fontWeight="bold">{type}</Text>
                    </Flex>

                    <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">
                        <Text>Purpose</Text>
                        <Text fontWeight="bold">{purpose}</Text>
                    </Flex>

                    {furnishingStatus && <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">
                        <Text>Furnishing Status</Text>
                        <Text fontWeight="bold">{furnishingStatus}</Text>
                    </Flex>}
                </Flex>

                <Box>
                    {amenities.length && <Text fontSize="2xl" fontWeight="black" marginTop="5">Amenities</Text>}

                    <Flex flexWrap="wrap">
                        {amenities.map((item) => (
                            item.amenities.map((amenity) => {
                                return <Text fontWeight="bold" color="blue.400" fontSize="l" bg="gray.200" m="1" borderRadius="5" p="1" key={amenity.text}>{amenity.text}</Text>
                            })
                        ))}
                    </Flex>
                </Box>
        </Box>
    </Box>
);

export default PropertyDetails;

export async function getServerSideProps({params: {id}}){
    const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

    return({
        props: {
            propertyDetails: data,
        }
    })
}