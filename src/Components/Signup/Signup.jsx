import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import {  FiPhone } from 'react-icons/fi'
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { Box, Input, Image, Flex, Button } from "@chakra-ui/react";


const Signup = () => {

  const auth = getAuth();
  const Googleprovider = new GoogleAuthProvider();

  const [data, setdata] = useState({});

  const handleGooglelogin = () => {
    signInWithPopup(auth, Googleprovider)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleInput = (event) => {
    let input = { [event.target.name]: event.target.value };

    console.log(event.target.value);
    setdata({ ...data, ...input });
  };

  const handleSubmit = () => {
    if(data.username!==undefined||""){
      if(data.email!==undefined||""){
        console.log("hi")
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((res) => {
          updateProfile(auth.currentUser, {
            displayName: data.username
          });
          console.log(res);
        })
        .catch((err) => alert(err));
      } 
   
    } 
  };

  return (
    <div style={{marginTop:"150px"}}>
    <Flex h="100vh" alignItems="center" justifyContent="center" >
      <Box
        w="300px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        gap="4"
        borderWidth="1px"
        color="white"
      >
        <Image
          src="https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2022/9/6/2127ba0a-fa66-43de-83ca-367322d814061662403347124-offer-banner-200-1080x496-code-_-MYNTRA200.jpg"
          alt="Dan Abramov"
        />
        <Input w="90%" onChange={handleInput} placeholder="Username" name="username" color="black" size="sm" />
        <Input w="90%" onChange={handleInput} placeholder="Email" name="email" color="black" size="sm" />
        <Input w="90%" onChange={handleInput} placeholder="Password" name="password" color="black" size="sm" />
        <Button onClick={ handleSubmit } borderRadius="0" mb="-5px" pt="18px" pr="90px" pb="18px" pl="90px" size="sm" bg="red.400" fontSize="sm">
          Sign up
        </Button>

        <Button  borderRadius="0" mb="-5px" pt="18px" pr="60px" pb="18px" bg="whiteAlpha.100" fontSize="sm" border="1px solid rgba(0, 0, 0, 0.10)" color="black" pl="60px" size="sm" leftIcon={< FiPhone />}>
           Phone Login 
        </Button>
        <Button onClick={ handleGooglelogin }  borderRadius="0" mb="25px" pt="18px" pr="75px" pb="18px" bg="whiteAlpha.100" fontSize="sm" border="1px solid rgba(0, 0, 0, 0.10)" color="black" pl="75px" size="sm" leftIcon={< FcGoogle />}>
            Google
        </Button>
      </Box>
    </Flex>
  </div>
  )
}

export default Signup

