import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useCallback, useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  // TODO: Remove this testing - just here to test if things work in sync
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Fetch and set meals
  const fetchMeals = useCallback(async () => {
    setLoading(true);
    const response = await fetch('https://react-custom-hooks-pract-d5cc1-default-rtdb.europe-west1.firebasedatabase.app/meals.json');

    // TODO: Remove this line testing - Just here to test code is sync and UX is good for slower connections
    await sleep(2000);

    const mealData = await response.json();

    setMeals(mealData);
    setLoading(false);
  }, []);

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
      {loading && <LoadingSpinner />}
      {!loading && mealsList.length > 0 &&
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      }
    </section>
  );
};

export default AvailableMeals;
