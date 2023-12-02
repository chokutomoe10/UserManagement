import { Card, Button, Text, Flex, Box } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export function LeftBar() {
    const navigate = useNavigate()

    function Logout() {
        localStorage.removeItem("token")
        navigate('/login')
    }

    return (
        <Card p={'20px'} position={'fixed'} display={'flex'} flexDirection={'column'} h={'100vh'} direction={'column'} w={'260px'} borderRadius={'0px'}>
            <Flex flexDirection={'column'} justifyContent={'space-between'} h={'full'}>
            <Box>
                <Text onClick={() => navigate('/')}>Dashboard</Text>
                <Text onClick={() => navigate('/usermanagement')}>Manajemen User</Text>
                <Text onClick={() => navigate('/productmanagement')}>Manajemen Produk</Text>
            </Box>
            <Button onClick={Logout} bg='springgreen' w="100%" borderRadius="20px">Logout</Button>
            </Flex>
        </Card>
    )
}