import { Avatar, Box, Flex, Text } from "@chakra-ui/react"
import millify from "millify"
import Image from "next/image"
import Link from "next/link"
import { GoVerified } from "react-icons/go"
import { FaBed, FaBath } from "react-icons/fa"
import { BsGridFill } from "react-icons/bs"
import ImageUnavailable from "../assets/image-not-found.jpg"

export const Property = ({property: {coverPhoto, price, rentFrequency, rooms, title, baths, area, agency, isVerified, externalID}}) => {
  return (
    <Link href={`property/${externalID}`} passHref>
        <Flex flexWrap="wrap" justifyContent="flex-start" w="420px" paddingTop="0" cursor="pointer">
            <Box>
                <Image src={coverPhoto ? coverPhoto.url : ImageUnavailable} alt={title} width={400} height={260} />
            </Box>

            <Box w="full">
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

                <Text fontSize="lg">
                    {title.length > 30 ? `${title.substring(0, 30)}...` : `${title}`}
                </Text>
            </Box>
        </Flex>
    </Link>
  )
}
