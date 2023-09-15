import { FormControl, FormLabel, Input, FormErrorMessage, Text, useBreakpointValue, Box, Button, Flex } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'

type OnNextCallback = () => void;
interface PersonalInfoFormProps {
    onNext: OnNextCallback;
    step: number;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ onNext, step }) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const [isUsernameError, setIsUsernameError] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPhoneError, setIsPhoneError] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
    });


    useEffect(() => {
        setIsUsernameError(!formData.username);
        setIsEmailError(!formData.email);
        setIsPhoneError(!formData.phone);
    }, [formData]);

    useEffect(() => {
        localStorage.setItem('personalInfo', JSON.stringify(formData));
    }, [formData])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'username') {
            if (!value) {
                setIsUsernameError(true);
            }
        } else if (name === 'email') {
            if (!value) {
                setIsEmailError(true);
            }
        } else if (name === 'phone' && (typeof(value) !== 'number' || value === '' )) {
            if (!value) {
                setIsPhoneError(true);
            }
        }
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <>
            <form>
                <Text color={'#022959'} fontFamily={'body'} fontSize={isMobile ? '24px' : '32px'} fontWeight={'700'} lineHeight={isMobile ? 'normal' : '36.77px'} fontStyle={'normal'} paddingBottom={'9px'}>Personal info</Text>
                <Text color={'#9699AA'} fontFamily={'body'} fontSize={'16px'} fontWeight={'400'} lineHeight={'25px'} fontStyle={'normal'} paddingBottom={'22px'}>Please provide your name, email address, and phone number.</Text>
                <FormControl isInvalid={isUsernameError} marginBottom={'22px'}>
                    <FormLabel color={'#022959'}>Name</FormLabel>
                    <Input
                        type="text"
                        name="username"
                        placeholder='e.g. Stephen King'
                        value={formData.username}
                        onChange={handleInputChange}
                        padding={'11px 16px'}
                    />
                    {isUsernameError ? (
                        <FormErrorMessage fontSize={'11px'} margin={'2px 0px'}>Username is required.</FormErrorMessage>
                    ) : (
                        ''
                    )}
                </FormControl>

                <FormControl isInvalid={isEmailError} marginBottom={'22px'}>
                    <FormLabel color={'#022959'}>Email Address</FormLabel>
                    <Input
                        type="email"
                        name="email"
                        placeholder='e.g. stephenking@lorem.com'
                        value={formData.email}
                        onChange={handleInputChange}
                        padding={'11px 16px'}
                    />
                    {isEmailError ? (
                        <FormErrorMessage fontSize={'11px'} margin={'2px 0px'}>Email is required.</FormErrorMessage>
                    ) : ''}
                </FormControl>

                <FormControl isInvalid={isPhoneError} marginBottom={'22px'}>
                    <FormLabel color={'#022959'}>Phone Number</FormLabel>
                    <Input
                        type="tel"
                        name="phone"
                        placeholder='e.g. +1 234 567 890'
                        value={formData.phone}
                        onChange={handleInputChange}
                        padding={'11px 16px'}
                    />
                    {isPhoneError ? (
                        <FormErrorMessage fontSize={'11px'} margin={'2px 0px'}>Phone number is required.</FormErrorMessage>
                    ) : ''}
                </FormControl>
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
                                step < 5 ?
                                    <Button backgroundColor={'#022959'} color='white' fontSize={'14px'} justifySelf={'flex-end'} type='submit' onClick={onNext} isDisabled={isUsernameError || isEmailError || isPhoneError}>Next Step</Button>
                                    :
                                    <Button backgroundColor={'#483EFF'} color='white' fontSize={'14px'} justifySelf={'flex-end'}>Confirm</Button>
                            }
                        </Flex>
                    </Box> :
                    <Flex backgroundColor={'white'} height={'72px'} width={'100%'} boxSizing={'border-box'} margin={'0 auto'} justifyContent={step > 1 && step < 5 ? 'space-between' : 'flex-end'} alignItems={'center'}>
                        {
                            step < 5 ?
                                <Button backgroundColor={'#022959'} color='white' fontSize={'14px'} justifySelf={'flex-end'} type='submit' onClick={onNext} isDisabled={isUsernameError || isEmailError || isPhoneError}>Next Step</Button>
                                :
                                <Button backgroundColor={'#483EFF'} color='white' fontSize={'14px'} justifySelf={'flex-end'}>Confirm</Button>
                        }
                    </Flex>
            }

        </>
    )
}

export default PersonalInfoForm