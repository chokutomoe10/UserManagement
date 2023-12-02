import { Heading, Container, Box, Flex, Input, Text, Button } from '@chakra-ui/react'
import { useLogin } from '../hooks/authHooks'

export function Login() {

const {handleChange, handleLogin} = useLogin()

    return (
        <>
            <Container>
                <Box p="30px" mt="117px">
                    <Heading as="h3" size="2xl" color="springgreen" pb="20px">App</Heading>
                    <Text fontWeight="medium" fontSize="3xl" pb="20px">Welcome to App</Text>
                    <Flex flexDirection={'column'} gap={3}>
                        <Input name="email" placeholder='Email' isRequired type='email' onChange={handleChange}/>
                        <Input name="password" placeholder='Password' isRequired type='password' onChange={handleChange} />
                        <Button onClick={handleLogin} bg={'springgreen'} borderRadius="20px"><Text fontSize={'xl'}>Login</Text></Button>
                    </Flex>
                </Box>
            </Container>
        </>
    )
}