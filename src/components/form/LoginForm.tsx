import { DialogActions, DialogContent } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { MeDocument, useLoginMutation } from "../../generated/graphql"
import { LoadingButton, OwnAlert, OwnTextField, TextAction } from "../custom"
import ForgotPasswordForm from "./ForgotPasswordForm"
import { useStyles } from "./style"

interface LoginInputs {
  identifier: string
  password: string
}

interface Props {
  handleClose: () => void
}

const LoginForm = ({ handleClose }: Props) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [init, setInit] = useState(false)
  const [forgotPwdForm, setForgotPwdForm] = useState(false)
  const { register, handleSubmit, formState } = useForm<LoginInputs>({
    mode: "onChange"
  })

  useEffect(() => {
    setInit(true)
  }, [init])

  const [loginMutation, { loading, error }] = useLoginMutation()

  const onSubmit = (formData: LoginInputs) => {
    loginMutation({
      variables: {
        input: { ...formData }
      },
      update(store, { data }) {
        if (data) {
          store.writeQuery({
            query: MeDocument,
            data: { me: { ...data.login } }
          })
        }
      }
    })
      .then(() => {
        handleClose()
      })
      .catch(() => {
        setOpen(true)
      })
  }

  return (
    <>
      {!forgotPwdForm ? (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogContent classes={{ root: classes.dialogContentRoot }}>
            <OwnAlert open={open} severity="error" onClose={() => setOpen(false)}>
              {error?.message}
            </OwnAlert>

            <OwnTextField
              autoFocus
              name="identifier"
              label="E-Mail or Username"
              type="text"
              inputRef={register({ required: true })}
            />
            <OwnTextField
              name="password"
              label="Password"
              type="password"
              inputRef={register({ required: true })}
            />
            <TextAction color="primary" variant="caption" onClick={() => setForgotPwdForm(true)}>
              Forgot your password?
            </TextAction>
          </DialogContent>
          <DialogActions className={classes.dialogAction}>
            <LoadingButton
              color="primary"
              variant="contained"
              type="submit"
              fullWidth
              disabled={!init || loading || !formState.isValid}
              loading={loading}
            >
              Log In
            </LoadingButton>
          </DialogActions>
        </form>
      ) : (
        <ForgotPasswordForm />
      )}
    </>
  )
}

export default LoginForm
