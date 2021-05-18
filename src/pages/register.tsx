import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { responsePathAsArray } from 'graphql'
import React from 'react'
import { useMutation } from 'urql'
import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'
import { useRegisterMutation } from '../generated/graphql'

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  return (
    <Wrapper>
      <Formik 
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values)
          if(response.data?.register.errors){
            [{field: 'username', message: 'Something went wrong'}]
            setErrors({
              username: "I'm an error!"
            })
          }
          
        }}
        >
          {({ isSubmitting}) => (
            <Form>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
              />
              <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
              </Box>
              <Button 
                mt={4}
                type="submit" 
                color="teal"
                isLoading={isSubmitting}
                >
                Register
              </Button>
            </Form>
          )}
      </Formik>
    </Wrapper>
  )
}

export default Register