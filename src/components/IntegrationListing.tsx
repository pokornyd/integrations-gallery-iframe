import Grid from '@react-css/grid';
import React, { useEffect, useState } from 'react'
import Preloader from './Preloader';

type Props = {}

interface IntegrationListItemProps {
  readonly id: number;
  readonly html_url: string;
  readonly name: string;
  readonly description: string;
}

const IntegrationListItem = ({
  id,
  html_url,
  name,
  description
}: IntegrationListItemProps) => {
  return (
    <div className="integration_card" key={id}>
      <a href={html_url}>
        <h2>{name}</h2>
        <h4>{description}</h4>
      </a>
    </div>
  )
}

export const IntegrationListing = (props: Props) => {
    const filters: string[] = [
    //   'Analytics':false,
    //   'E-Commerce':false,
    //   'Editor':false,
    //   'Emails':false,
    //   'Forms':false,
    //   'Icons':false,
    //   'Other':false,
    //   'Personalization':false,
    //   'Recommendations':false,
    //   'Search':false,
    //   'Text':false,
    //   'Utilities':false,
    //   'Video':false
    // }
    'Analytics',
    'E-Commerce',
    'Editor',
    'Emails',
    'Forms',
    'Icons',
    'Other',
    'Personalization',
    'Recommendations',
    'Search',
    'Text',
    'Utilities',
    'Video'
    ]
    const [ searchQuery, setSearchQuery ] = useState<string>('');
    const [ results, setResults ] = useState<IntegrationListItemProps[]>();
    const [ activeFilters, setActiveFilters ] = useState<string[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    const handleOnChange = (key: string, filtersToSet: { [key: string]: boolean }) => {
      filtersToSet[key] = !filtersToSet[key];
      console.log(filtersToSet[key])
      return filtersToSet;
    }

    useEffect(() => {      
      const getData = async (filters: string[], searchQuery: string, ) => {
        setIsLoading(true);
        //let filtersToSet: string[] = [];
        const data = await (
            await fetch(`https://api.github.com/search/repositories?q=topic:kontent-ai-integration${searchQuery.length > 0 ? '+' + searchQuery : ''}`)
        ).json().then(result => result.items) as IntegrationListItemProps[];

        setResults(data);
        setIsLoading(false);
      }
      
      const timeOutId = setTimeout(() => {
        console.log(searchQuery);
        getData(filters, searchQuery);
      }, 500);
      return () => clearTimeout(timeOutId);
      
    }, [activeFilters, searchQuery])
    
    return (
        <div>
            <input className="searchbar" onChange={e => setSearchQuery(e.target.value)}/>
            {/* {filters.map((filter) => {
              return (
                <span key={filter}>
                  <input type="checkbox" value={filter}/>
                  <label>{filter}</label>
                </span>
              )
            }
            )} */}
            <div className='cards'>
            {isLoading 
            ?
            <Preloader/>
            :
            results?.map(result => 
              <IntegrationListItem {...result}/>
            )}
            </div>
        </div>
    )
}