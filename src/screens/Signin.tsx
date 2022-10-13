import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from '../components/Button'

import Input from '../components/Input'
import Logo from '../components/Logo'

const Signin = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  return (
    <View style={styles.wrapper}>
      <Logo style={styles.logo} size={80} />
      <Text style={styles.label}>Log into Toby</Text>
      <View style={styles.inputsWrapper}>
        <Input
          label='Email'
          style={styles.input}
          onChangeText={setEmail}
          value={email}
        />
        <Input
          label='Password'
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
      </View>
      <View style={styles.gap} />
      <Button style={styles.button}>Login</Button>

      {/* <View style={styles.inputsWrapper}>
        {!!error && <Error text={error} onClose={this.onClose} />}
      </View>
      <Spinner overlay visible={loading} /> */}
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
    fontWeight: '500',
    fontSize: 20,
    marginBottom: 24,
  },
  inputsWrapper: {
    marginTop: 24,
    width: '100%',
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
