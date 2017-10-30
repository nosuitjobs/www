/* global URL */

import React from 'react'
import PropTypes from 'prop-types'

import { dateHelper } from 'Helpers'

import {
  About,
  Location,
  JobItemNode,
  Logo,
  Header,
  New,
  Position,
  PublishedDate
} from './styled'

const JobItem = props => {
  const { date, company, path, specs, title } = props
  const location = specs.find(item => item.id === 'location').description
  const { name, about } = company
  const hostname =
    typeof window !== `undefined` ? new URL(company.url) : 'fallback'
  const isNew = dateHelper.inLast24Hours(date)

  return (
    <JobItemNode>
      <Header>
        {<Logo src={`/img/logo/${hostname}.png`} alt={name} />}
        <Location>{location}</Location>
        <PublishedDate>{dateHelper.ago(date)}</PublishedDate>
      </Header>
      <Position to={path}>
        {isNew && <New>NEW</New>}
        {title} @ {name}
      </Position>
      {about && <About>{about}</About>}
    </JobItemNode>
  )
}

JobItem.propTypes = {
  city: PropTypes.string,
  company: PropTypes.shape({
    name: PropTypes.string,
    about: PropTypes.string,
    logo: PropTypes.string
  }),
  date: PropTypes.string,
  id: PropTypes.number,
  title: PropTypes.string
}

export default JobItem
