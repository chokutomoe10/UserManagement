import { Box, Flex, Text } from '@chakra-ui/react'
import { LeftBar } from '../components/LeftBar'

export default function Dashboard() {
    return (
        <>
            <Flex>
                <LeftBar/>
                <Box px={10} ml={'260px'} py={7} w={'100%'}>
                    <Flex justifyContent={'space-between'}>
                        <Text mb={10}>Dashboard</Text>
                    </Flex>
                </Box>
            </Flex>
        </>
    )
}