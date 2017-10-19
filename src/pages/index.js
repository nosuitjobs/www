import React from 'react'
import { JobList } from '../components'

export default ({ data, ...props }) => {
  const jobs = data.allJobsYaml.edges.map(item => item.node)

  const companies = data.allCompaniesYaml.edges
    .map(item => item.node)
    .reduce((acc, { id, ...props }) => {
      acc[id] = props
      return acc
    }, {})

  return <JobList jobs={jobs} companies={companies} />
}

export const query = graphql`
  query Jobs {
    allCompaniesYaml {
      edges {
        node {
          id
          name
          logo
          url
          size
        }
      }
    }
    allJobsYaml {
      edges {
        node {
          team
          teamSize
          date
          companyId
          title
          path
          description
          location {
            city
            country
          }
          salary {
            currency
            from
            to
          }
        }
      }
    }
  }
`
