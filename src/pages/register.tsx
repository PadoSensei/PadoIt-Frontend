import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { responsePathAsArray } from 'graphql'
import React from 'react'
import { useMutation } from 'urql'
import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'
import { useRegisterMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Wrapper>
      <Formik 
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values)
          if(response.data?.register.errors){
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push('/')
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