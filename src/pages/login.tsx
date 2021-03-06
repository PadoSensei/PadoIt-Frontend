import { Box, Button } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { responsePathAsArray } from 'graphql'
import React from 'react'
import { useMutation } from 'urql'
import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'
import { useLoginMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'


export const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Wrapper>
      <Formik 
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({ options: values});
          if(response.data?.login.errors){
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
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
                login
              </Button>
            </Form>
          )}
      </Formik>
    </Wrapper>
  )
}

export default Login