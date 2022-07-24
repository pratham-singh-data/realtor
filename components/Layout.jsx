import { Box } from "@chakra-ui/react"
import Head from "next/head"
import { Navbar } from "./Navbar"

export const Layout = ({ children }) => {
  return (
    <>
        <Head>
            <title>Realtor</title>
        </Head>

        <Box maxWidth="1280px" m="auto">
            <header>
                <Navbar/>
            </header>

            <main>
                {children}
            </main>
        </Box> 
    </>
  )
}