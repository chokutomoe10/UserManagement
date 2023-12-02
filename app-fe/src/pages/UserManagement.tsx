import { Box, Flex, Text, Table, TableContainer, Thead, Td, Tr, Th, Tbody } from '@chakra-ui/react'
import { API } from '../lib/api'
import { useState, useEffect } from 'react'
import { IUser } from '../interfaces/User'
import { LeftBar } from '../components/LeftBar'
import { RootState } from '../stores/types/rootState'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export function UserManagement() {
    const [users, setUsers] = useState<IUser[]>()
    const auth = useSelector((state : RootState) => state.auth)

    const getUsers = async () => {
        try {
            const response = await API.get('/users')
            setUsers(response.data)
            console.log(response.data);
        } catch (error) {
            console.error('error get products', error);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    if (auth.role == 'customer' || auth.role == 'seller')  {
        return <Navigate to={'/'}/>
    }

    const filteredUser = users?.filter((item) => item.role != 'admin')

    return (
        <>
            <Flex>
                <LeftBar/>
                <Box ml={'260px'} px={10} py={7} w={'100%'}>
                    <Flex justifyContent={'space-between'}>
                        <Text mb={10}>Manajemen User</Text>
                    </Flex>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                            <Tr>
                                <Th>No</Th>
                                <Th>Nama Lengkap</Th>
                                <Th>Username</Th>
                                <Th>Email</Th>
                                <Th>Role</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                                {filteredUser?.map((item, index) => {
                                    return (
                                        <>
                                            <Tr key={index}>
                                                <Td>{index += 1}</Td>
                                                <Td>{item.fullname}</Td>
                                                <Td>{item.username}</Td>
                                                <Td>{item.email}</Td>
                                                <Td>{item.role}</Td>
                                            </Tr>
                                        </>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Flex>
        </>
    )
}