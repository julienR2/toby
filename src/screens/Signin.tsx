import React from 'react'
import { StyleSheet, View } from 'react-native'

import { RootStackScreenProps } from '../../types/navigation'
import Button from '../components/Button'
import { Logo } from '../components/Icons'
import Input from '../components/Input'
import Spinner from '../components/Spinner'
import Text from '../components/Text'
import { useStoreControls, useStoreItem } from '../hooks/useStore'
import colors from '../theme/colors'
import { post } from '../utils/fetch'

type SigninProps = {
  navigation?: RootStackScreenProps<'Signin'>['navigation']
}

const Signin = ({ navigation }: SigninProps) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [, setToken] = useStoreItem('token')
  const { flush } = useStoreControls()

  const onLoginPress = React.useCallback(async () => {
    setError(false)
    setLoading(true)

    try {
      const data: { token: string } = await post(
        'https://api2.gettoby.com/v2/users/login',
        { params: { email, password } },
      )

      setToken(data.token)

      navigation?.reset({ index: 0, routes: [{ name: 'App' }] })
    } catch (error) {
      setError(true)
    }

    setLoading(false)
  }, [email, password, navigation, setToken])

  const onEmailChange = React.useCallback(
    (text: string) => {
      if (error) {
        setError(false)
      }

      setEmail(text)
    },
    [error],
  )

  const onPasswordChange = React.useCallback(
    (text: string) => {
      if (error) {
        setError(false)
      }

      setPassword(text)
    },
    [error],
  )

  React.useEffect(() => {
    flush()
  }, [flush])

  return (
    <View style={styles.wrapper}>
      <Logo style={styles.logo} size={80} color={colors.primary} />
      <Text type="title" style={styles.label} weight="medium">
        Log into Toby
      </Text>
      <View style={styles.inputsWrapper}>
        {error && (
          <View style={styles.errorWrapper}>
            <Text color="white">Email or password incorrect</Text>
          </View>
        )}
        <Input
          label="Email"
          style={styles.input}
          onChangeText={onEmailChange}
          value={email}
        />
        <Input
          label="Password"
          style={styles.input}
          onChangeText={onPasswordChange}
          value={password}
          secureTextEntry
        />
      </View>
      <View style={styles.gap} />
      <Button style={styles.button} onPress={onLoginPress}>
        Login
      </Button>
      <Spinner showOverlay visible={loading} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    padding: 48,
  },
  logo: {
    marginBottom: 32,
  },
  label: {
    marginBottom: 24,
  },
  inputsWrapper: {
    marginTop: 24,
    width: '100%',
  },
  errorWrapper: {
    borderRadius: 2,
    backgroundColor: colors.primary,
    padding: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 32,
  },
  gap: { flex: 1 },
  button: {
    width: '80%',
    paddingVertical: 16,
  },
})

export default Signin
