import React, { useState } from 'react'
import { Box, Button, Flex, Text, VStack, HStack, Center, useBreakpointValue } from '@chakra-ui/react'
import desktopBackground from './assets/images/bg-sidebar-desktop.svg'
import ChoosePlan from './components/ChoosePlan';
import FinishUp from './components/FinishUp';
import PersonalInfoForm from './components/PersonalInfoForm';
import PickAddOns from './components/PickAddOns';
import ThankYou from './components/ThankYou';

function App() {
  const [step, setStep] = useState<number>(1);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleStepChange = (newStep: number) => {
    setStep(newStep);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalInfoForm onNext={() => handleStepChange(step+1)} step={step}/>;
      case 2:
        return <ChoosePlan onNext={() => handleStepChange(step+1)} onPrev={() => handleStepChange(step-1)} step={step}/>;
      case 3:
        return <PickAddOns onNext={() => handleStepChange(step+1)} onPrev={() => handleStepChange(step-1)} step={step}/>;
      case 4:
        return <FinishUp onNext={() => handleStepChange(step+1)} onPrev={() => handleStepChange(step-1)} step={step}/>;
      case 5:
        return <ThankYou />;
      default:
        return null;
    }
  };


  return (
    <>
      {
        isMobile ?
          <VStack height={'100%'} boxSizing={'border-box'}>
            <Box
              className='custom-container'
            >
              <HStack gap={'16px'} color={'white'} zIndex={'2'} position={'fixed'} width={'100%'} justifyContent={'center'} marginTop={'48px'} fontSize={'14px'} fontWeight={'700'}>
                <Center borderRadius={'50%'} border={step === 1 ? 'none' : '1px solid white'} width={'33px'} height={'33px'} className={step === 1 ? 'active-step' : ''}>
                  <Text>1</Text>
                </Center>
                <Center borderRadius={'50%'} border={step === 2 ? 'none' : '1px solid white'} width={'33px'} height={'33px'} className={step === 2 ? 'active-step' : ''}>
                  <Text>2</Text>
                </Center>
                <Center borderRadius={'50%'} border={step === 3 ? 'none' : '1px solid white'} width={'33px'} height={'33px'} className={step === 3 ? 'active-step' : ''}>
                  <Text>3</Text>
                </Center>
                <Center borderRadius={'50%'} border={step === 4 ? 'none' : '1px solid white'} width={'33px'} height={'33px'} className={step === 4 ? 'active-step' : ''}>
                  <Text>4</Text>
                </Center>
                <Center borderRadius={'50%'} border={step === 5 ? 'none' : '1px solid white'} width={'33px'} height={'33px'} className={step === 5 ? 'active-step' : ''}>
                  <Text>5</Text>
                </Center>
              </HStack>
              <Box backgroundColor={'white'} width={'90%'} minHeight={'25rem'} height={'fit-content'} borderRadius={'10px'} margin={'0 auto'} marginTop={'100px'} position={'relative'} zIndex={'2'} boxShadow={'0px 25px 40px -20px rgba(0, 0, 0, 0.10)'} padding={'1.5rem'}>
                {renderStep()}
              </Box>
            </Box>
          </VStack> :
          <>
            <Center bg={'#EFF5FF'} padding={'105px 250px'} height={'100vh'} boxSizing={'border-box'}>
              <Flex bg={'white'} padding={'16px'} flexDirection={'row'} maxWidth={'940px'} height={'600px'} position={'relative'}>
                <Box bgImage={`url(${desktopBackground})`} minWidth={'274px'} height={'100%'} bgRepeat={'no-repeat'} textAlign={'left'} padding={'32px 40px'}>
                  <VStack gap={'31px'} color={'white'} zIndex={'1'} width={'100%'} justifyContent={'flex-start'} marginTop={'40px'} fontSize={'14px'} fontWeight={'700'}>
                    <HStack gap={'16px'} justifySelf={'flex-start'} width={'100%'}>
                      <Center borderRadius={'50%'} border={step === 1 ? 'none' : '1px solid white'} width={'33px'} height={'33px'} className={step === 1 ? 'active-step' : ''}>
                        <Text>1</Text>
                      </Center>
                      <VStack gap={'4px'} alignItems={'flex-start'}>
                        <Text textTransform={'uppercase'} color={'#ABBCFF'} fontSize={'12px'} fontWeight={'400'}>Step 1</Text>
                        <Text textTransform={'uppercase'} color={'white'} fontSize={'14px'} fontWeight={'700'} lineHeight={'16px'} letterSpacing={'1px'}>Your Info</Text>
                      </VStack>
                    </HStack>
                    <HStack gap={'16px'} justifySelf={'flex-start'} width={'100%'}>
                      <Center borderRadius={'50%'} border={step === 2 ? 'none' : '1px solid white'} width={'33px'} height={'33px'} className={step === 2 ? 'active-step' : ''}>
                        <Text>2</Text>
                      </Center>
                      <VStack gap={'4px'} alignItems={'flex-start'}>
                        <Text textTransform={'uppercase'} color={'#ABBCFF'} fontSize={'12px'} fontWeight={'400'}>Step 2</Text>
                        <Text textTransform={'uppercase'} color={'white'} fontSize={'14px'} fontWeight={'700'} lineHeight={'16px'} letterSpacing={'1px'}>SELECT PLAN</Text>
                      </VStack>
                    </HStack>
                    <HStack gap={'16px'} justifySelf={'flex-start'} width={'100%'}>
                      <Center borderRadius={'50%'} border={step === 3 ? 'none' : '1px solid white'} width={'33px'} height={'33px'} className={step === 3 ? 'active-step' : ''}>
                        <Text>3</Text>
                      </Center>
                      <VStack gap={'4px'} alignItems={'flex-start'}>
                        <Text textTransform={'uppercase'} color={'#ABBCFF'} fontSize={'12px'} fontWeight={'400'}>Step 3</Text>
                        <Text textTransform={'uppercase'} color={'white'} fontSize={'14px'} fontWeight={'700'} lineHeight={'16px'} letterSpacing={'1px'}>Add-ons</Text>
                      </VStack>
                    </HStack>
                    <HStack gap={'16px'} justifySelf={'flex-start'} width={'100%'}>
                      <Center borderRadius={'50%'} border={step === 4 ? 'none' : '1px solid white'} width={'33px'} height={'33px'} className={step === 4 ? 'active-step' : ''}>
                        <Text>4</Text>
                      </Center>
                      <VStack gap={'4px'} alignItems={'flex-start'}>
                        <Text textTransform={'uppercase'} color={'#ABBCFF'} fontSize={'12px'} fontWeight={'400'}>Step 4</Text>
                        <Text textTransform={'uppercase'} color={'white'} fontSize={'14px'} fontWeight={'700'} lineHeight={'16px'} letterSpacing={'1px'}>Summary</Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </Box>
                <VStack backgroundColor={'white'} padding={'56px 100px 0px 100px'} justifyContent={'space-between'}>
                  {renderStep()}
                </VStack>
              </Flex>
            </Center>
          </>
      }
    </>
  )
}

export default App
