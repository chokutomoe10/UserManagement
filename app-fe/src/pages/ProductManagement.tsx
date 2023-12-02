import { Box, Flex, Text, Table, TableContainer, Thead, Td, Tr, Th, Tbody } from '@chakra-ui/react'
import { API } from '../lib/api'
import { useState, useEffect } from 'react'
import { IProduct } from '../interfaces/Product'
import { LeftBar } from '../components/LeftBar'
import { RootState } from '../stores/types/rootState'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export function ProductManagement() {
    const [products, setProducts] = useState<IProduct[]>()
    const auth = useSelector((state : RootState) => state.auth)

    const getProducts = async () => {
        try {
            const response = await API.get('/products')
            setProducts(response.data)
            console.log(response.data);
        } catch (error) {
            console.error('error get products', error);
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    if (auth.role == 'customer')  {
        return <Navigate to={'/'}/>
    }

    return (
        <>
            <Flex>
                <LeftBar/>
                <Box px={10} ml={'260px'} py={7} w={'100%'}>
                    <Flex justifyContent={'space-between'}>
                        <Text mb={10}>Manajemen Product</Text>
                    </Flex>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                            <Tr>
                                <Th>No</Th>
                                <Th>Nama</Th>
                                <Th>Harga</Th>
                                <Th>Status</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                                {products?.map((item, index) => {
                                    return (
                                        <Tr key={index}>
                                            <Td>{index += 1}</Td>
                                            <Td>{item.name}</Td>
                                            <Td>{item.price}</Td>
                                            <Td>{item.status}</Td>
                                        </Tr>
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