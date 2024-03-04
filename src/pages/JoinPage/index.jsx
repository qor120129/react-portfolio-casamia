import JoinForm from 'components/JoinForm'

const JoinPage = ({usersDB, mobile}) => {
  return (
    <JoinForm usersDB={usersDB} mobile={mobile}/>
  )
}

export default JoinPage