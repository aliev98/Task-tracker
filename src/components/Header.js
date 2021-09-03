import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd, showText }) => {

    const onClick = () => {
        console.log('Click')
    }
    
    return (
     <header className='header'>
         <h1>{title}</h1>
         <Button color= {showText? 'red': 'green'} text= {showText? 'Close' : 'Add' } onClick={onAdd} />
     </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

// const headingStyle = {
//     color: 'red', backgroundColor: 'black'
// }

export default Header