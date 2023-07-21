import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Select,
    useToast,
  } from '@chakra-ui/react';
  import axios from "axios"
import { useState } from 'react';
import {PiSpeakerSimpleHighFill} from "react-icons/pi"
import {RxReset} from "react-icons/rx"



const Home = () => {
  const toast = useToast()
  const [feeling,setFeeling]=useState("")
  const [work,setWork]=useState("")
  const [issue,setIssue]=useState("")

  const [res,setRes]=useState("")

  const [view,setView]=useState("none")

  const handleSubmit=()=>
  {
    if(feeling=="" || work=="" || issue=="")
    {
      toast({
        title: 'Error',
        description: "Please fill all the details",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    else
    {

      // const response = await fetch(`https://gpt-api.richexplorer.com/api/general`, {
      //   method: 'POST',
      //   mode: 'no-cors',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     usecase: "GPT_MEDITATION_CREATOR",
      //     userInput: `feeling ${feeling} right now, they currently are ${work} and facing ${issue} issues today`,
      //   }),
      // });
      //   console.log(response);

      // const response=await axios.post("https://gpt-api.richexplorer.com/api/general",
      //   {
      //   usecase: "GPT_MEDITATION_CREATOR",
      //   userInput: `feeling ${feeling} right now, they currently are ${work} and facing ${issue} issues today`},
      //   {mode:"no-cors"})

      //   console.log(response)
      // }


      axios.post(`https://backendquest.onrender.com/data`,{feeling,work,issue}).then(r=>{setRes(r.data.generatedText)
    
       setView("block")
     
    })
     
  }
}


  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const speechSynthesis = window.speechSynthesis;
      const speechText = new SpeechSynthesisUtterance(res);
      speechSynthesis.speak(speechText);
    } else {
      alert('Your browser does not support text-to-speech.');
    }
  };


  return (
    <>
    <Box display={view=="none"? "block":"none"}>
      <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            MEDITATO
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Get Prosenalized Meditation ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            
              <Box>
                <FormControl  isRequired>
                  <FormLabel>How are they feeling right now? </FormLabel>
                   <Select placeholder='Select your feeling' value={feeling} onChange={(e)=>setFeeling(e.target.value)}>
                    <option value={"Happy"}>Happy</option>
                    <option value={"Motivated"}>Motivated</option>
                    <option value={"Calm"}>Calm</option>
                    <option value={"Sad"}>Sad</option>
                    <option value={"Anxious"}>Anxious</option>
                    <option value={"Angry"}>Angry</option>
                    <option value={"Stressed"}>Stressed</option>
                    <option value={"Tired"}>Tired</option>
                   </Select>
                </FormControl>
              </Box>
              
              <Box>
                <FormControl isRequired>
                  <FormLabel>What do they do?</FormLabel>
                  <Input type="text" value={work} onChange={(e)=>setWork(e.target.value)} />
                </FormControl>
              </Box>
            
            <FormControl isRequired>
              <FormLabel>What are the issues they are facing today?</FormLabel>
              <Input type="text" value={issue} onChange={(e)=>setIssue(e.target.value)} />
            </FormControl>
            
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSubmit}
                >
                Submit
              </Button>
            </Stack>
            <Stack pt={6}>
              
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </Box>
     <Box display={view} textAlign={"center"} boxShadow={"2xl"} m={"auto"} w={"700px"} p={"10px"} borderRadius={"16px"} mt={"50px"}>
       <Heading>Meditation</Heading>
       <Text fontSize={"20px"}fontWeight={"600"}>feeling {feeling} right now, they currently are {work} and facing {issue} issues today</Text>
       <Text fontSize={"18px"} fontWeight={"600"} mt={"20px"}>{res}</Text>

       <Flex gap={"10px"} justifyContent={"center"}>

            <Button onClick={handleSpeak}> <PiSpeakerSimpleHighFill/></Button>
            <Button onClick={()=>setView("none")} ><RxReset/></Button>
        </Flex>

     </Box>


    
    </>
  )


 
  
}

export default Home