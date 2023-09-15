import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, Image, VStack, HStack, Center, useBreakpointValue, Button } from '@chakra-ui/react';
import arcadeIcon from '../assets/images/icon-arcade.svg';
import advancedIcon from '../assets/images/icon-advanced.svg'
import proIcon from '../assets/images/icon-pro.svg'

type OnNextCallback = () => void;
type OnPrevCallback = () => void;
interface ChoosePlanProps {
    onNext: OnNextCallback;
    onPrev: OnPrevCallback;
    step: number;
}

interface PlanDetails {
    name: string;
    price: number;
    savings: string;
}

interface Plans {
    [plan: string]: {
        monthly: PlanDetails;
        yearly: PlanDetails;
    };
}

const plans: Plans = {
    Arcade: {
        monthly: {
            name: 'Arcade',
            price: 9,
            savings: '2 months free',
        },
        yearly: {
            name: 'Arcade',
            price: 90,
            savings: '2 months free',
        },
    },
    Advanced: {
        monthly: {
            name: 'Advanced',
            price: 12,
            savings: '2 months free',
        },
        yearly: {
            name: 'Advanced',
            price: 120,
            savings: '2 months free',
        },
    },
    Pro: {
        monthly: {
            name: 'Pro',
            price: 15,
            savings: '2 months free',
        },
        yearly: {
            name: 'Pro',
            price: 150,
            savings: '2 months free',
        },
    }
};


const ChoosePlan: React.FC<ChoosePlanProps> = ({ onNext, onPrev, step }) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const [selectedPlan, setSelectedPlan] = useState<string>('Arcade');
    const [selectedPlanDetails, setSelectedPlanDetails] = useState({});
    const [plan, setPlan] = useState<'monthly' | 'yearly'>('monthly');

    const togglePlan = () => {
        setPlan(plan === 'monthly' ? 'yearly' : 'monthly');
    };


    const handlePlanClick = (planType: 'Pro' | 'Advanced' | 'Arcade') => {
        setSelectedPlan(planType);
        setSelectedPlanDetails({
            'Plantype': planType,
            'Planduraton': plan,
            'Plancost': plans[selectedPlan][plan].price
        })
    };

    useEffect(() => {
        localStorage.setItem('planDuration', plan);
        localStorage.setItem('selectedPlanDetails', JSON.stringify(selectedPlanDetails)); //serialisation
        console.log(Object.keys(selectedPlanDetails).length === 0);
    }, [selectedPlanDetails, plan])

    return (
        <>
            <form>
                <Text color={'#022959'} fontFamily={'body'} fontSize={isMobile ? '24px' : '32px'} fontWeight={'700'} lineHeight={'normal'} fontStyle={'normal'} paddingBottom={'9px'}>Select your plan</Text>
                <Text color={'#9699AA'} fontFamily={'body'} fontSize={'16px'} fontWeight={'400'} lineHeight={'25px'} fontStyle={'normal'} paddingBottom={'22px'}>You have the option of monthly or yearly billing.</Text>
                <Flex flexDirection={isMobile ? 'column' : 'row'} gap={isMobile ? '12px' : '16px'}>
                    <PlanItem
                        image={arcadeIcon}
                        planType="Arcade"
                        plan={plan}
                        selectedPlan={selectedPlan}
                        handlePlanClick={() => handlePlanClick('Arcade')}
                        isMobile={isMobile}
                    />
                    <PlanItem
                        image={advancedIcon}
                        planType="Advanced"
                        plan={plan}
                        selectedPlan={selectedPlan}
                        handlePlanClick={() => handlePlanClick('Advanced')}
                        isMobile={isMobile}
                    />
                    <PlanItem
                        image={proIcon}
                        planType="Pro"
                        plan={plan}
                        selectedPlan={selectedPlan}
                        handlePlanClick={() => handlePlanClick('Pro')}
                        isMobile={isMobile}
                    />
                </Flex>
                <Center backgroundColor={'#F8F9FF'} width={'100%'} height={'48px'} padding={'13px 56px'} fontSize={'14px'} fontWeight={'500'} borderRadius={'8px'} marginTop={isMobile ? '12px' : '32px'}>
                    <HStack gap={'24px'}>
                        <Text color={plan === 'monthly' ? '#022959' : '#9699AA'} fontFamily={'body'} lineHeight={'20px'}>Monthly</Text>
                        <Flex bg={'#022959'} width={'38px'} height={'20px'} borderRadius={'12px'} padding={'4px'} justifyContent={plan === 'monthly' ? 'flex-start' : 'flex-end'} transition={'all 0.3s'}>
                            <Box bg={'white'} width={'12px'} height={'12px'} borderRadius={'50%'} cursor={'pointer'} onClick={() => togglePlan()} />
                        </Flex>
                        <Text color={plan === 'yearly' ? '#022959' : '#9699AA'} fontFamily={'body'} lineHeight={'20px'}>Yearly</Text>
                    </HStack>
                </Center>
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
                        <Flex padding={'0rem 1rem'} backgroundColor={'white'} height={'72px'} width={'100%'} boxSizing={'border-box'} margin={'0 auto'} justifyContent={step > 1 && step < 5 ? 'space-between' : 'flex-end'} alignItems={'center'}>
                            {
                                step > 1 && step < 5 ?
                                    <Text color={'#9699AA'} cursor={'pointer'} onClick={onPrev}>Go Back</Text>
                                    : ''
                            }
                            {
                                step < 5 ?
                                    <Button backgroundColor={'#022959'} color='white' fontSize={'14px'} justifySelf={'flex-end'} onClick={onNext} disabled={Object.keys(selectedPlanDetails).length === 0}>Next Step</Button>
                                    :
                                    <Button backgroundColor={'#483EFF'} color='white' fontSize={'14px'} justifySelf={'flex-end'}>Confirm</Button>
                            }
                        </Flex>
                    </Box> :
                    <Flex backgroundColor={'white'} height={'72px'} width={'100%'} boxSizing={'border-box'} margin={'0 auto'} justifyContent={step > 1 && step < 5 ? 'space-between' : 'flex-end'} alignItems={'center'}>
                        {
                            step > 1 && step < 5 ?
                                <Text color={'#9699AA'} cursor={'pointer'} onClick={onPrev}>Go Back</Text>
                                : ''
                        }
                        {
                            step < 5 ?
                                <Button backgroundColor={'#022959'} color='white' fontSize={'14px'} justifySelf={'flex-end'} type='submit' onClick={onNext} disabled={Object.keys(selectedPlanDetails).length === 0}>Next Step</Button>
                                :
                                <Button backgroundColor={'#483EFF'} color='white' fontSize={'14px'} justifySelf={'flex-end'}>Confirm</Button>
                        }
                    </Flex>
            }

        </>
    )
}

interface PlanItemProps {
    image: string;
    planType: string;
    selectedPlan: string;
    plan: string;
    handlePlanClick: (planType: string) => void;
    isMobile: boolean | undefined;
}

const PlanItem: React.FC<PlanItemProps> = ({ image, planType, selectedPlan, plan, handlePlanClick, isMobile }) => {
    return (
        <>
            <Flex
                onClick={() => handlePlanClick(planType)}
                border={selectedPlan === planType ? '1px solid #483EFF' : '1px solid #D6D9E6'} cursor={'pointer'} borderRadius={'8px'} backgroundColor={'white'} flexDirection={isMobile ? 'row' : 'column'} minHeight={isMobile ? '77px' : '160px'} width={'100%'} maxHeight={'99px'} justifyContent={isMobile ? 'flex-start' : 'space-between'} padding={'16px'} minWidth={'132px'}>
                <Image src={image} alt="" width={'40px'} height={'40px'} />
                <VStack marginLeft={isMobile ? '10px' : '0px'} justifyContent={'flex-start'} alignItems={'flex-start'} gap={'2px'}>
                    <Text color={'#022959'} fontSize={'16px'} fontFamily={'body'} fontWeight={'500'}>{planType}</Text>
                    {
                        plan === 'monthly' ?
                            <Text color={'#9699AA'} fontFamily={'body'} lineHeight={'20px'}>${plans[planType].monthly.price}/mo</Text>
                            :
                            <>
                                <Text color={'#9699AA'} fontFamily={'body'} lineHeight={'20px'}>${plans[planType].yearly.price}/yr</Text>
                                <Text color={'#022959'} fontFamily={'body'} lineHeight={'20px'} fontSize={'12px'}>{plans[planType].yearly.savings}</Text>
                            </>
                    }
                </VStack>
            </Flex>
        </>
    )
}

export default ChoosePlan