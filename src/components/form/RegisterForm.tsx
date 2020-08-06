import { DialogActions, DialogContent, TextField } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { MeDocument, useRegisterMutation } from "../../generated/graphql"
import { LoadingButton, OwnAlert } from "../custom"
import { useStyles } from "./style"

interface RegisterInputs {
  username: string
  email: string
  password: string
  confirmPassword: string
}

interface Props {
  handleClose: () => void
}

const RegisterForm = ({ handleClose }: Props) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [init, setInit] = useState(false)
  const { register, handleSubmit, getValues, errors, formState } = useForm<RegisterInputs>({
    mode: "onChange"
  })

  useEffect(() => {
    setInit(true)
  }, [init])

  const [registerMutation, { loading, error }] = useRegisterMutation()

  const onSubmit = (formData: RegisterInputs) => {
    registerMutation({
      variables: {
        input: { ...formData }
      },
      update(store, { data }) {
        if (data) {
          store.writeQuery({
            query: MeDocument,
            data: { me: { ...data.register } }
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
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <DialogContent classes={{ root: classes.dialogContentRoot }}>
        <OwnAlert open={open} severity="error" closeButton>
          {error?.message}
        </OwnAlert>

        <TextField
          autoFocus
          id="username"
          name="username"
          label="Username"
          type="text"
          variant="outlined"
          error={!!errors.username && !!errors.username.message}
          helperText={!!errors.username && errors.username.message}
          fullWidth
          margin="normal"
          inputRef={register({
            required: true,
            minLength: {
              value: 4,
              message: "*Usernames must be between 4 and 20 characters."
            },
            maxLength: {
              value: 20,
              message: "*Usernames must be between 4 and 20 characters."
            }
          })}
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          error={!!errors.email && !!errors.email.message}
          helperText={!!errors.email && errors.email.message}
          fullWidth
          margin="normal"
          inputRef={register({
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "*Email address must be valid."
            }
          })}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          error={!!errors.password && !!errors.password.message}
          helperText={!!errors.password && errors.password.message}
          fullWidth
          margin="normal"
          inputRef={register({
            required: true,
            minLength: {
              value: 4,
              message: "*Passwords must be at least 4 characters long."
            },
            maxLength: {
              value: 60,
              message: "*Passwords must be less than 60 characters long."
            }
          })}
        />
        <TextField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          variant="outlined"
          error={!!errors.confirmPassword && !!errors.confirmPassword.message}
          helperText={!!errors.confirmPassword && errors.confirmPassword.message}
          fullWidth
          margin="normal"
          inputRef={register({
            required: true,
            validate: {
              matchesPreviousPassword: (value: string) => {
                const { password } = getValues()
                return password === value || "*Passwords must be identical."
              }
            }
          })}
        />
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
          Sign Up
        </LoadingButton>
      </DialogActions>
    </form>
  )
}

export default RegisterForm
