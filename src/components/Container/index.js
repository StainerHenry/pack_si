import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import styles from './styles.module.scss'
import { connect } from 'react-redux'
import { loadLocalPack } from '../../localStorage/localPacks'

Container.propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func
}
function Container(props) {
  const route = useLocation()

  React.useEffect(() => {
    routeChanged(route.pathname.split('/').filter(String))
  }, [route])

  const routeChanged = async pathParts => {
    if(pathParts[0] === 'pack') {
      const packUUID = pathParts[1]
      const pack = await loadLocalPack(packUUID)
      props.dispatch({ type: 'pack/load', pack: pack ?? 'notFound' })
    }
  }

  return (
    <div className={styles.container}>
      {props.children}
    </div>
  )
}

export default connect(null)(Container)
