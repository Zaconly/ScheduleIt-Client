import * as ApolloReactCommon from "@apollo/client"
import * as ApolloReactHooks from "@apollo/client"
import gql from "graphql-tag"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: any
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any
}

export type Query = {
  __typename?: "Query"
  _?: Maybe<Scalars["Boolean"]>
  user?: Maybe<User>
  allUsers?: Maybe<Array<User>>
  me: User
  template?: Maybe<Template>
  authorTemplates?: Maybe<Array<Template>>
  allTemplates?: Maybe<Array<Template>>
  board?: Maybe<Board>
  userBoards?: Maybe<Array<Board>>
  allBoards?: Maybe<Array<Board>>
  task?: Maybe<Task>
  boardTasks?: Maybe<Array<Task>>
  userTasks?: Maybe<Array<Task>>
  tag?: Maybe<Tag>
  taskTags?: Maybe<Array<Tag>>
  tagTasks?: Maybe<Array<Task>>
}

export type QueryUserArgs = {
  id: Scalars["ID"]
}

export type QueryTemplateArgs = {
  id: Scalars["ID"]
}

export type QueryAuthorTemplatesArgs = {
  authorId: Scalars["ID"]
}

export type QueryBoardArgs = {
  id: Scalars["ID"]
}

export type QueryUserBoardsArgs = {
  userId?: Maybe<Scalars["ID"]>
}

export type QueryTaskArgs = {
  id: Scalars["ID"]
}

export type QueryBoardTasksArgs = {
  boardId: Scalars["ID"]
}

export type QueryTagArgs = {
  id: Scalars["ID"]
}

export type QueryTaskTagsArgs = {
  taskId: Scalars["ID"]
}

export type QueryTagTasksArgs = {
  id: Scalars["ID"]
}

export type Mutation = {
  __typename?: "Mutation"
  _?: Maybe<Scalars["Boolean"]>
  addUser?: Maybe<User>
  updateUser?: Maybe<User>
  deleteUser?: Maybe<Scalars["Boolean"]>
  login: User
  register: User
  logout: Scalars["Boolean"]
  forgotPassword: Scalars["Boolean"]
  resetPassword: Scalars["Boolean"]
  changePassword: Scalars["Boolean"]
  addTemplate?: Maybe<Template>
  updateTemplate?: Maybe<Template>
  deleteTemplate?: Maybe<Scalars["Boolean"]>
  addBoard?: Maybe<Board>
  updateBoard?: Maybe<Board>
  deleteBoard?: Maybe<Scalars["Boolean"]>
  addTask?: Maybe<Task>
  updateTask?: Maybe<Task>
  deleteTask?: Maybe<Scalars["Boolean"]>
}

export type MutationAddUserArgs = {
  input: UserInput
}

export type MutationUpdateUserArgs = {
  id: Scalars["ID"]
  input: UpdateInput
}

export type MutationDeleteUserArgs = {
  id: Scalars["ID"]
}

export type MutationLoginArgs = {
  input: LoginInput
}

export type MutationRegisterArgs = {
  input: RegisterInput
}

export type MutationForgotPasswordArgs = {
  email: Scalars["String"]
}

export type MutationResetPasswordArgs = {
  token: Scalars["String"]
  email: Scalars["String"]
  newPassword: Scalars["String"]
}

export type MutationChangePasswordArgs = {
  oldPassword: Scalars["String"]
  newPassword: Scalars["String"]
}

export type MutationAddTemplateArgs = {
  input: TemplateInput
}

export type MutationUpdateTemplateArgs = {
  id: Scalars["ID"]
  input: TemplateInput
}

export type MutationDeleteTemplateArgs = {
  id: Scalars["ID"]
}

export type MutationAddBoardArgs = {
  input: BoardInput
}

export type MutationUpdateBoardArgs = {
  id: Scalars["ID"]
  input: BoardInput
}

export type MutationDeleteBoardArgs = {
  id: Scalars["ID"]
}

export type MutationAddTaskArgs = {
  boardId: Scalars["ID"]
  input: TaskInput
}

export type MutationUpdateTaskArgs = {
  id: Scalars["ID"]
  input: TaskInput
}

export type MutationDeleteTaskArgs = {
  id: Scalars["ID"]
}

export type Subscription = {
  __typename?: "Subscription"
  _?: Maybe<Scalars["Boolean"]>
}

export enum Role {
  User = "USER",
  Admin = "ADMIN"
}

export type UpdateInput = {
  username?: Maybe<Scalars["String"]>
}

export type UserInput = {
  username: Scalars["String"]
  email: Scalars["String"]
  password: Scalars["String"]
}

export type User = {
  __typename?: "User"
  id: Scalars["ID"]
  username: Scalars["String"]
  email: Scalars["String"]
  isActive: Scalars["Boolean"]
  role: Role
  boards: Array<Maybe<Board>>
  createdAt?: Maybe<Scalars["DateTime"]>
  updatedAt?: Maybe<Scalars["DateTime"]>
}

export type LoginInput = {
  identifier: Scalars["String"]
  password: Scalars["String"]
}

export type RegisterInput = {
  username: Scalars["String"]
  email: Scalars["String"]
  password: Scalars["String"]
}

export type TemplateInput = {
  name: Scalars["String"]
}

export type Template = {
  __typename?: "Template"
  id: Scalars["ID"]
  name: Scalars["String"]
  author?: Maybe<User>
  createdAt?: Maybe<Scalars["DateTime"]>
  updatedAt?: Maybe<Scalars["DateTime"]>
}

export type BoardInput = {
  name: Scalars["String"]
  icon: Scalars["String"]
  isArchived: Scalars["Boolean"]
}

export type Board = {
  __typename?: "Board"
  id: Scalars["ID"]
  name: Scalars["String"]
  template?: Maybe<Template>
  tasks?: Maybe<Array<Task>>
  icon?: Maybe<Scalars["String"]>
  isArchived: Scalars["Boolean"]
  createdAt?: Maybe<Scalars["DateTime"]>
  updatedAt?: Maybe<Scalars["DateTime"]>
}

export type TaskInput = {
  name: Scalars["String"]
  isCompleted: Scalars["Boolean"]
  startDate?: Maybe<Scalars["DateTime"]>
  endDate?: Maybe<Scalars["DateTime"]>
}

export type Task = {
  __typename?: "Task"
  id: Scalars["ID"]
  name: Scalars["String"]
  isCompleted: Scalars["Boolean"]
  startDate?: Maybe<Scalars["DateTime"]>
  endDate?: Maybe<Scalars["DateTime"]>
  board?: Maybe<Board>
  tags?: Maybe<Array<Tag>>
  createdAt?: Maybe<Scalars["DateTime"]>
  updatedAt?: Maybe<Scalars["DateTime"]>
}

export type Tag = {
  __typename?: "Tag"
  id: Scalars["ID"]
  name: Scalars["String"]
  color?: Maybe<Scalars["String"]>
}

export type UserInfoFragment = { __typename?: "User" } & Pick<User, "id" | "username" | "email">

export type BoardInfoFragment = { __typename?: "Board" } & Pick<Board, "id" | "name">

export type TaskInfoFragment = { __typename?: "Task" } & Pick<Task, "id" | "name">

export type TagInfoFragment = { __typename?: "Tag" } & Pick<Tag, "id" | "name">

export type LoginMutationVariables = Exact<{
  input: LoginInput
}>

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "User" } & Pick<User, "role" | "createdAt" | "updatedAt"> & UserInfoFragment
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: "Query" } & {
  me: { __typename?: "User" } & Pick<User, "role" | "createdAt" | "updatedAt"> & {
      boards: Array<
        Maybe<
          { __typename?: "Board" } & {
            tasks?: Maybe<
              Array<
                { __typename?: "Task" } & {
                  tags?: Maybe<Array<{ __typename?: "Tag" } & TagInfoFragment>>
                } & TaskInfoFragment
              >
            >
          } & BoardInfoFragment
        >
      >
    } & UserInfoFragment
}

export const UserInfoFragmentDoc = gql`
  fragment UserInfo on User {
    id
    username
    email
  }
`
export const BoardInfoFragmentDoc = gql`
  fragment BoardInfo on Board {
    id
    name
  }
`
export const TaskInfoFragmentDoc = gql`
  fragment TaskInfo on Task {
    id
    name
  }
`
export const TagInfoFragmentDoc = gql`
  fragment TagInfo on Tag {
    id
    name
  }
`
export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      ...UserInfo
      role
      createdAt
      updatedAt
    }
  }
  ${UserInfoFragmentDoc}
`
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const MeDocument = gql`
  query Me {
    me {
      ...UserInfo
      role
      boards {
        ...BoardInfo
        tasks {
          ...TaskInfo
          tags {
            ...TagInfo
          }
        }
      }
      createdAt
      updatedAt
    }
  }
  ${UserInfoFragmentDoc}
  ${BoardInfoFragmentDoc}
  ${TaskInfoFragmentDoc}
  ${TagInfoFragmentDoc}
`

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions)
}
export function useMeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>