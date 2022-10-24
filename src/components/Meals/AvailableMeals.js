import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useCallback, useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const { isLoading, error, httpRequest: getMealsFromServer } = useHttp();

  // Fetch and set meals
  const fetchMeals = useCallback(async () => {
    const requestConfig = {
      url: 'https://react-custom-hooks-pract-d5cc1-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
    }

    await getMealsFromServer(requestConfig, setMeals);

  }, [getMealsFromServer]);

  // On first render only get the meals
  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      {isLoading && <LoadingSpinner loadingMessage='Loading our meals...' />}
      {!isLoading && mealsList.length > 0 && !error &&
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      }
      {error && <p>API error encountered, please reload the page.</p>}
    </section>
  );
};

export default AvailableMeals;
