import isArray from 'lodash/isArray'

const justifyMap = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
  fullscreen: 'stretch',
}

const alignMap = {
  top: 'center',
  center: 'center',
  bottom: 'center',
  fullscreen: 'stretch',
}

const directionMap = {
  top: 'column',
  center: 'column',
  bottom: 'column',
  fullscreen: 'row',
}

export const mapBackdropProps = (align) => {
  const props = {}
  const _align = !isArray(align) ? [align] : align

  props.justify = _align.map((v) => justifyMap[v])
  props.align = _align.map((v) => alignMap[v])
  props.direction = _align.map((v) => directionMap[v])

  return props
}

export const mapContainerProps = (align) => {
  const props = {}
  const _align = !isArray(align) ? [align] : align

  props.flex = _align.map((v) => (v === 'fullscreen' ? '1' : 'none'))

  return props
}
