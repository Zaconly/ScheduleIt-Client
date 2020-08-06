import { Box, Container, TextField, Typography } from "@material-ui/core"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { useResetPasswordMutation } from "../../generated/graphql"
import { LoadingButton, OwnAlert } from "../custom"

interface ResetPasswordInputs {
  newPassword: string
  confirmNewPassword: string
}

interface Props {
  token: string
}

const ResetPasswordForm = ({ token }: Props) => {
  const { register, handleSubmit, getValues, errors, formState } = useForm<ResetPasswordInputs>({
    mode: "onChange"
  })
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)

  const [resetPasswordMutation, { loading, error }] = useResetPasswordMutation()

  const onSubmit = ({ newPassword }: ResetPasswordInputs) => {
    resetPasswordMutation({
      variables: {
        newPassword,
        token
      }
    })
      .then(() => {
        setSuccess(true)
      })
      .catch(() => {
        setErrorMsg(true)
      })
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: 100 }}>
      <Typography variant="h4">Reset your password</Typography>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <OwnAlert open={success} severity="success" style={{ margin: "10px 0" }}>
          Your password has been successfully reset. You can now connect using your new password.
        </OwnAlert>
        <OwnAlert open={errorMsg} severity="error" style={{ margin: "10px 0" }}>
          {error?.message}
        </OwnAlert>

        <TextField
          id="newPassword"
          name="newPassword"
          label="Password"
          type="password"
          variant="outlined"
          error={!!errors.newPassword}
          helperText={!!errors.newPassword && errors.newPassword.message}
          fullWidth
          margin="normal"
          inputRef={register({
            required: true,
            minLength: {
              value: 4,
              message: "*New Password must be at least 4 characters long."
            },
            maxLength: {
              value: 60,
              message: "*New Password must be less than 60 characters long."
            }
          })}
        />
        <TextField
          id="confirmNewPassword"
          name="confirmNewPassword"
          label="Confirm Password"
          type="password"
          variant="outlined"
          error={!!errors.confirmNewPassword}
          helperText={!!errors.confirmNewPassword && errors.confirmNewPassword.message}
          fullWidth
          margin="normal"
          inputRef={register({
            required: true,
            validate: {
              matchesPreviousPassword: (value: string) => {
                const { newPassword } = getValues()
                return newPassword === value || "*Passwords must be identical."
              }
            }
          })}
        />
        <Box marginTop={2}>
          <LoadingButton
            color="primary"
            variant="contained"
            type="submit"
            fullWidth
            disabled={success || errorMsg || loading || !formState.isValid}
            loading={loading}
          >
            Reset
          </LoadingButton>
        </Box>
      </form>
    </Container>
  )
}

export default ResetPasswordForm
