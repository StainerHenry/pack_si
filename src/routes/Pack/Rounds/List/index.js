import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import Round from './Round'
import AddItem from 'components/ItemsList/AddItem'
import { connect } from 'react-redux'
import { saveLocalPack } from 'localStorage/localPacks'
import ItemsList from 'components/ItemsList'
import EditingToolbar from 'components/EditingToolbar'
import { mapPackState } from '../../../../utils'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

RoundsList.propTypes = {
  pack: PropTypes.object,
  dispatch: PropTypes.func
}

function RoundsList(props) {
  const [rounds, setRounds] = React.useState([])
  const [editing, setEditing] = React.useState(false)
  const pack = props.pack

  React.useEffect(() => setRounds(props.pack.rounds), [props.pack.rounds])

  const handleAddRound = async name => {
    let packRounds = [...pack.rounds]
    packRounds.push({ name, themes: [] })
    updateRounds(packRounds)
  }

  const handleRemoveRound = index => {
    let packRounds = [...pack.rounds]
    packRounds.splice(index, 1)
    updateRounds(packRounds)
  }

  const onDragEnd = result => {
    if (!result.destination) return
    const items = reorder(rounds, result.source.index, result.destination.index)
    updateRounds(items)
  }

  const handleSwitchEditing = () => {
    setEditing(!editing)
  }

  const handleRoundNameChange = (e, index) => {
    const namesList = [...rounds]
    namesList[index].name = e.target.value
    updateRounds(namesList)
  }

  const updateRounds = async items => {
    setRounds(items)
    let newPack = { ...pack, rounds: items }
    await saveLocalPack(newPack)
    props.dispatch({ type: 'pack/load', pack: newPack })
  }

  const names = rounds.map(pack => pack.name)

  return (
    <div className={styles.rounds}>
      <EditingToolbar
        showButton={Boolean(rounds.length)}
        onSwitch={handleSwitchEditing}
        editing={editing}
        heading='Раунды пака'
      />
      <ItemsList
        onDragEnd={onDragEnd}
        droppableId='rounds'
        droppableClassName={styles.droppable}
        itemComponent={Round}
        draggableProps={{
          pack, editing,
          handleRemoveRound: handleRemoveRound,
          handleRoundNameChange: handleRoundNameChange,
          roundNamesTextInput: names
        }}
        list={rounds}
        noItemsLabel='Еще нет раундов'
      />
      <AddItem
        onAdd={handleAddRound}
        inputLabel='Название раунда'
        buttonLabel='Добавить раунд'
      />
    </div>
  )
}

export default connect(mapPackState)(RoundsList)
