import React from 'react'
import { Center, VStack, Image, Text, useBreakpointValue } from '@chakra-ui/react'
import thankYouIcon from '../assets/images/icon-thank-you.svg';

const ThankYou = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    return (
        <>
            <Center justifyContent={'center'} alignContent={'center'}>
                <VStack textAlign={'center'} margin={'0 auto'} justifyContent={'center'} alignContent={'center'}>
                    <Image src={thankYouIcon} alt="" width={'56px'} height={'56px'} marginBottom={'24px'}/>
                    <Text color={'#022959'} fontSize={isMobile ? '24px' : '32px'} fontWeight={'700'} textAlign={'center'} paddingBottom={'9px'}>Thank you!</Text>
                    <Text fontSize={'16px'} color={'#9699AA'} lineHeight={'25px'}>
                        Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.
                    </Text>
                </VStack>
            </Center>
        </>
    )
}

export default ThankYou