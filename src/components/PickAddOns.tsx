import React, { useEffect, useState } from 'react';
import { Text, Flex, Checkbox, VStack, useBreakpointValue, Button, Box } from '@chakra-ui/react';

type OnNextCallback = () => void;
type OnPrevCallback = () => void;
interface PickAddOnsProps {
    onNext: OnNextCallback;
    onPrev: OnPrevCallback;
    step: number;
}

interface AddonItemProps {
    addOnId: number;
    name: string;
    description: string;
    price: number;
    isSelected: boolean;
    duration: string;
    onClick: () => void;
}

const PickAddOns: React.FC<PickAddOnsProps> = ({ onNext, onPrev, step }) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const duration: any = localStorage.getItem('planDuration');
    const [selectedAddOns, setSelectedAddOns] = useState<{ [key: number]: { name: string; description: string; price: number } }>({});


    const handleAddOnClick = (addOnId: number, name: string, description: string, price: number) => {
        if (selectedAddOns[addOnId]) {
            // If the add-on is already selected, remove it from the selectedAddOns object
            const { [addOnId]: removedAddOn, ...restAddOns } = selectedAddOns;
            setSelectedAddOns(restAddOns);
        } else {
            // If the add-on is not selected, add it to the selectedAddOns object
            setSelectedAddOns({
                ...selectedAddOns,
                [addOnId]: { name, description, price },
            });
        }
    };

    useEffect(() => {
        localStorage.setItem('selectedAddOns', JSON.stringify(selectedAddOns)); //serialisation
        console.log('Stringified version:', JSON.stringify(selectedAddOns));
    }, [selectedAddOns])

    return (
        <>
            <form>
                <Text color={'#022959'} fontFamily={'body'} fontSize={isMobile ? '24px' : '32px'} fontWeight={'700'} lineHeight={'normal'} fontStyle={'normal'} paddingBottom={'9px'}>Pick add-ons</Text>
                <Text color={'#9699AA'} fontFamily={'body'} fontSize={'16px'} fontWeight={'400'} lineHeight={'25px'} fontStyle={'normal'} paddingBottom={'22px'}>Add-ons help enhance your gaming experience.</Text>
                <Flex flexDirection="column">
                    <AddonItem
                        addOnId={1}
                        name="Online service"
                        description="Access to multiplayer games"
                        price={duration === 'monthly' ? 1 : 10}
                        duration={duration}
                        isSelected={Boolean(selectedAddOns[1])}
                        onClick={() => handleAddOnClick(1, "Online service", "Access to multiplayer games", duration === 'monthly' ? 1 : 10)}
                    />
                    <AddonItem
                        addOnId={2}
                        name="Larger storage"
                        description="Extra 1TB of cloud save"
                        price={duration === 'monthly' ? 2 : 20}
                        duration={duration}
                        isSelected={Boolean(selectedAddOns[2])}
                        onClick={() => handleAddOnClick(2, "Larger storage", "Extra 1TB of cloud save", duration === 'monthly' ? 2 : 20)}
                    />
                    <AddonItem
                        addOnId={3}
                        name="Customizable profile"
                        description="Custom theme on your profile"
                        price={duration === 'monthly' ? 2 : 20}
                        duration={duration}
                        isSelected={Boolean(selectedAddOns[3])}
                        onClick={() => handleAddOnClick(3, "Customizable profile", "Custom theme on your profile", duration === 'monthly' ? 2 : 20)}
                    />

                </Flex>
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
                                    <Button backgroundColor={'#022959'} color='white' fontSize={'14px'} justifySelf={'flex-end'} type='submit' onClick={onNext} isDisabled={Object.keys(selectedAddOns).length === 0}>Next Step</Button>
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
                              <Button backgroundColor={'#022959'} color='white' fontSize={'14px'} justifySelf={'flex-end'} type='submit' onClick={onNext} isDisabled={Object.keys(selectedAddOns).length === 0}>Next Step</Button>
                              :
                              <Button backgroundColor={'#483EFF'} color='white' fontSize={'14px'} justifySelf={'flex-end'}>Confirm</Button>
                      }
                  </Flex>
            }
          
        </>
    );
};

const AddonItem: React.FC<AddonItemProps> = ({ addOnId, name, description, price, isSelected, duration, onClick }) => {
    return (
        <Flex
            onClick={onClick}
            border={isSelected ? '1px solid #483EFF' : '1px solid #D6D9E6'}
            borderRadius={'8px'}
            backgroundColor={'white'}
            height={'62px'}
            width={'100%'}
            marginBottom={'12px'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            padding={'16px'}
            cursor="pointer"
        >
            <Checkbox isChecked={isSelected} colorScheme={'purple'} height={'20px'} width={'20px'} />
            <VStack marginLeft={'10px'} justifyContent={'flex-start'} alignItems={'flex-start'} gap={'2px'}>
                <Text color={'#022959'} fontSize={'14px'} fontFamily={'body'} fontWeight={'500'}>
                    {name}
                </Text>
                <Text color={'#9699AA'} fontSize={'12px'} fontFamily={'body'} lineHeight={'20px'}>
                    {description}
                </Text>
            </VStack>
            {
                duration === 'monthly' ?
                    <Text fontSize={'12px'} color={'#483EFF'} lineHeight={'20px'} marginLeft={'auto'}>
                        +${price}/mo
                    </Text> :
                    <Text fontSize={'12px'} color={'#483EFF'} lineHeight={'20px'} marginLeft={'auto'}>
                        +${price}/yr
                    </Text>
            }
        </Flex>
    );
};

export default PickAddOns;
