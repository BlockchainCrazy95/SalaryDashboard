import { style } from '@mui/system'
import React from 'react'
import styled from 'styled-components'

const styles = {
    salaryText: {
        fontSize: "26px",
        lineHeight: "40px",
        marginLeft: "15px"
    }
}

const LogoDiv = styled.div`
    display: inline-flex;
`

const Logo = () => {
    return (
        <LogoDiv>
            <img src="assets/here/logo.svg" />
            <span style={styles.salaryText}>SALARY</span>
        </LogoDiv>
    )
}

export default Logo;