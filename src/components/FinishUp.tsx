import { Box, HStack, VStack, Text, Divider, useBreakpointValue, Button, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'

type OnNextCallback = () => void;
type OnPrevCallback = () => void;
interface FinishUpProps {
    onNext: OnNextCallback;
    onPrev: OnPrevCallback;
    step: number;
}

interface ISelectedAddOns {
    name: string;
    price: number;
}

const FinishUp: React.FC<FinishUpProps> = ({ onNext, onPrev, step }) => {
    const isMobile = useBreakpointValue({ base: true, md: false });

    const storedSelectedAddOns: any = localStorage.getItem('selectedAddOns');
    const selectedAddOnsObject = JSON.parse(storedSelectedAddOns); //deserialisation
    const selectedAddOnsArray: ISelectedAddOns[] = Object.values(selectedAddOnsObject); // changing to an array of objects

    const storedSelectedPlanDetails: any = localStorage.getItem('selectedPlanDetails');
    const selectedPlanDetailsObject = JSON.parse(storedSelectedPlanDetails); //deserialisation

    const duration: any = localStorage.getItem('planDuration');

    useEffect(() => {
        console.log(selectedAddOnsArray)
    }, [])

    const totalAmount = (): number => {
        const addOnsTotal = selectedAddOnsArray.reduce((acc: number, currentValue: ISelectedAddOns) => {
            if (typeof currentValue.price === 'number') {
                return acc + currentValue.price;
            }
            return acc;
        }, 0);

        return addOnsTotal + selectedPlanDetailsObject.Plancost;
    }


    return (
        <>
            <form>
                <Text color={'#022959'} fontFamily={'body'} fontSize={isMobile ? '24px' : '32px'} fontWeight={'700'} lineHeight={'normal'} fontStyle={'normal'} paddingBottom={'9px'}>Finishing up</Text>
                <Text color={'#9699AA'} fontFamily={'body'} fontSize={'16px'} fontWeight={'400'} lineHeight={'25px'} fontStyle={'normal'} paddingBottom={'22px'}>Double-check everything looks OK before confirming.</Text>
                <Box borderRadius={'8px'} backgroundColor={'#F8F9FF'} minHeight={'148px'} height={'auto'} width={'100%'} justifyContent={'flex-start'} alignItems={'center'} padding={'16px'}>
                    <VStack marginLeft={'10px'} justifyContent={'flex-start'} alignItems={'flex-start'} gap={'12px'}>
                        <VStack width={'100%'} alignItems={'flex-start'} fontFamily={'body'}>
                            <Text color={'#022959'} fontSize={'14px'} fontFamily={'body'} fontWeight={'700'}>{selectedPlanDetailsObject.Plantype} {" "} ({selectedPlanDetailsObject.Planduraton})</Text>
                            <HStack justifyContent={'space-between'} width={'100%'} alignItems={'flex-start'}>
                                <Text fontSize={'14px'} color={'#9699AA'} lineHeight={'20px'} textDecoration={'underline'} cursor={'pointer'} >Change</Text>
                                {
                                    duration === 'monthly' ?
                                        <Text fontSize={'14px'} color={'#022959'} lineHeight={'20px'} fontWeight={'700'}>+${selectedPlanDetailsObject.Plancost}/mo</Text>
                                        :
                                        <Text fontSize={'14px'} color={'#022959'} lineHeight={'20px'} fontWeight={'700'}>+${selectedPlanDetailsObject.Plancost}/yr</Text>
                                }
                            </HStack>
                        </VStack>
                        <Divider orientation='horizontal' />
                        {
                            selectedAddOnsArray ?
                                selectedAddOnsArray?.map((each: ISelectedAddOns, index: number) => {
                                    return (
                                        <HStack key={index} justifyContent={'space-between'} width={'100%'} lineHeight={'20px'} fontFamily={'body'}>
                                            <Text color={'#9699AA'} fontSize={'14px'} fontFamily={'body'} fontWeight={'400'}>{each.name}</Text>
                                            {duration === 'monthly' ?
                                                <Text fontSize={'14px'} color={'#022959'} lineHeight={'20px'} marginLeft={'auto'}>+${each.price}/mo</Text>
                                                :
                                                <Text fontSize={'14px'} color={'#022959'} lineHeight={'20px'} marginLeft={'auto'}>+${each.price}/yr</Text>
                                            }
                                        </HStack>
                                    )
                                }) : ""
                        }
                    </VStack>
                </Box>
                {
                    duration === 'monthly' ?
                        <HStack justifyContent={'space-between'} fontFamily={'body'} width={'100%'} lineHeight={'20px'} padding={'32px 16px'}>
                            <Text color={'#9699AA'} fontSize={'14px'} fontFamily={'body'} fontWeight={'400'}>Total (per month)</Text>
                            <Text fontSize={'16px'} fontWeight={'700'} color={'#483EFF'} lineHeight={'20px'} marginLeft={'auto'}>+${totalAmount()}/mo</Text>
                        </HStack>
                        :
                        <HStack justifyContent={'space-between'} fontFamily={'body'} width={'100%'} lineHeight={'20px'} padding={'32px 16px'}>
                            <Text color={'#9699AA'} fontSize={'14px'} fontFamily={'body'} fontWeight={'400'}>Total (anually)</Text>
                            <Text fontSize={'16px'} fontWeight={'700'} color={'#483EFF'} lineHeight={'20px'} marginLeft={'auto'}>+${totalAmount()}/yr</Text>
                        </HStack>
                }
            </form>
            {
                isMobile ?
                    <Box
                        position={'fixed'}
                        bottom={'0'}
                        left={'0'}
                        right={'0'}
                        marginTop={'5rem'}
                    >
                        <Flex padding={'0rem 1rem'} backgroundColor={'white'} height={'72px'} width={'100%'} boxSizing={'border-box'} margin={'0 auto'} justifyContent={'flex-end'} alignItems={'center'}>
                            <Button backgroundColor={'#483EFF'} color='white' fontSize={'14px'} justifySelf={'flex-end'} onClick={onNext}>Confirm</Button>
                        </Flex>
                    </Box> :
                    <Flex backgroundColor={'white'} height={'72px'} width={'100%'} boxSizing={'border-box'} margin={'0 auto'} justifyContent={'flex-end'} alignItems={'center'}>
                        <Button backgroundColor={'#483EFF'} color='white' fontSize={'14px'} justifySelf={'flex-end'} onClick={onNext}>Confirm</Button>
                    </Flex>
            }

        </>
    )
}

export default FinishUp