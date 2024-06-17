import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useLocation } from 'react-router'
import { uuidRegex } from '../../../consts'
import { saveLocalPack } from 'localStorage/localPacks'
import clone from 'just-clone'
import NotFound404 from 'components/NotFound404'
import RoundTable from './RoundTable'
import ThemesEditing from './ThemesEditing'
import EditingToolbar from 'components/EditingToolbar'
import { mapPackState } from '../../../utils'

RoundThemes.propTypes = {
  pack: PropTypes.object,
  dispatch: PropTypes.func
}

function RoundThemes(props) {
  const [themes, setThemes] = React.useState([])
  const [found, setFound] = React.useState()
  const route = useLocation()
  const roundIndex = route.pathname.split(new RegExp(`/pack/${uuidRegex}/rounds/`), 2)[1]
  const [expand, setExpand] = React.useState()
  let [editing, setEditing] = React.useState(false)

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const round = props.pack.rounds[roundIndex-1]
  React.useEffect(() => {
    if(round) setFound(true)
    else setFound(false)
  }, [])

  const handleAddTheme = async name => {
    let roundThemes = [...themes]
    roundThemes.push({ name, id: Date.now(), questions: [] })
    updateThemes(roundThemes)
  }

  const onDragEnd = result => {
    if (!result.destination) return
    const items = reorder(themes, result.source.index, result.destination.index)
    updateThemes(items)
  }

  const updateThemes = async items => {
    setThemes(items)
    const newPack = clone(props.pack)
    newPack.rounds[roundIndex-1].themes = items
    await saveLocalPack(newPack)
    props.dispatch({ type: 'pack/load', pack: newPack })
  }

  const handleRemoveTheme = index => {
    let roundThemes = [...themes]
    roundThemes.splice(index, 1)
    updateThemes(roundThemes)
  }

  const handleChangeThemeName = (index, newName) => {
    let roundThemes = [...themes]
    roundThemes[index].name = newName
    updateThemes(roundThemes)
  }

  React.useEffect(() => round && setThemes(round.themes), [round.themes])

  return (
    found !== undefined && (
      found
        ? <div>
          <EditingToolbar
            showButton={Boolean(themes.length)}
            onSwitch={() => setEditing(!editing)}
            editing={editing}
            heading={`Темы и вопросы раунда ${round.name}`}
          />
          {themes.length && !editing
            ? <RoundTable
              themes={themes}
            />
            : <ThemesEditing
              themes={themes}
              onDragEnd={onDragEnd}
              expand={expand}
              setExpand={setExpand}
              setEditing={setEditing}
              handleAddTheme={handleAddTheme}
              handleRemoveTheme={handleRemoveTheme}
              handleChangeThemeName={handleChangeThemeName}
            />
          }
        </div>
        : <NotFound404 />
    )
  )
}

export default connect(mapPackState)(RoundThemes)
