import React from 'react';
import Popover from 'react-awesome-popover';
import { Head } from '../components/Head';

export default function Home() {
  // inputs
  const [flour, setFlour] = React.useState(500);
  const [levain, setLevain] = React.useState(224);
  const [levainHydration, setLevainHydration] = React.useState(1);
  const [waterHydration, setWaterHydration] = React.useState(0.72);

  // manually do this division cause precision errors in js :(
  const salt = 2.2 / 100;
  const water = flour * waterHydration;

  const flourInLevain = levain / (1 + levainHydration);
  const waterInLevain = levain - flourInLevain;

  const finalFlour = flour - flourInLevain;
  const finalWater = flour * waterHydration - waterInLevain;
  const finalSalt = Math.round(flour * salt);

  const levainPctDisplay = (100 * (flourInLevain / flour)).toFixed();
  const waterHydrationDisplay = (100 * waterHydration).toFixed();
  const levainHydrationDisplay = (100 * levainHydration).toFixed();
  const saltDisplay = 100 * salt;
  const yieldLoafs = flour < 800 ? 1 : 800 <= flour && flour < 1200 ? 2 : 3;

  return (
    <>
      <Head />
      <main className="app-container">
        <div className="header">
          <h1>Bread</h1>
          <small>Easy levain computations.</small>
        </div>

        <p className="paragraph">
          Based on{' '}
          <Popover
            style={{ display: 'inline' }}
            placement="bottom-start"
            arrowProps={{ style: { color: 'white' } }}
          >
            <strong>{flour}g</strong>
            <div className="popover-container">
              <select
                value={flour}
                onChange={ev => setFlour(Number(ev.target.value))}
              >
                <option value="250">250g</option>
                <option value="500">500g</option>
                <option value="1000">1000g</option>
              </select>
            </div>
          </Popover>{' '}
          of flour and using{' '}
          <Popover
            style={{ display: 'inline' }}
            placement="bottom-end"
            arrowProps={{ style: { color: 'white' } }}
          >
            <strong>{levain}g</strong>
            <div className="popover-container">
              <input
                type="number"
                placeholder="Enter levain grams"
                value={levain}
                onChange={ev =>
                  !isNaN(Number(ev.target.value)) &&
                  setLevain(Number(ev.target.value))
                }
              />
            </div>
          </Popover>{' '}
          of levain, add <strong>{finalFlour}g</strong> grams of flour,{' '}
          <strong>{finalWater}g</strong> grams of water, and{' '}
          <strong>{finalSalt}g</strong> of salt. Yields{' '}
          <strong>{yieldLoafs}</strong>.
        </p>

        <table>
          <thead>
            <tr>
              <th />
              <th className="right">In levain</th>
              <th className="right">In final dough</th>
              <th className="right">Total</th>
              <th className="right">Baker %</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Flour</td>
              <td className="right">{flourInLevain}g</td>
              <td className="right">{finalFlour}g</td>
              <td className="right">{flour}g</td>
              <td className="right">100%</td>
            </tr>
            <tr>
              <td>Water</td>
              <td className="right">{waterInLevain}g</td>
              <td className="right">{finalWater}g</td>
              <td className="right">{water}g</td>
              <td className="right">{waterHydrationDisplay}%</td>
            </tr>
            <tr>
              <td>Salt</td>
              <td className="right"></td>
              <td className="right">{finalSalt}g</td>
              <td className="right">{finalSalt}g</td>
              <td className="right">{saltDisplay}%</td>
            </tr>
            <tr>
              <td>Levain</td>
              <td className="right"></td>
              <td className="right">{levain}g</td>
              <td className="right"></td>
              <td className="right">{levainPctDisplay}%</td>
            </tr>
          </tbody>
        </table>
        <p>
          <small>
            The baker's percentage for levain is the amount of flour in the
            levain expressed as a percentage of the total flour in the recipe.
          </small>
        </p>

        <table>
          <thead>
            <tr>
              <th>Levain hydration</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Flour</td>
              <td className="right">100%</td>
            </tr>
            <tr>
              <td>Water</td>
              <td className="right">{levainHydrationDisplay}%</td>
            </tr>
          </tbody>
        </table>
        <p>
          <small>
            Hydration is the amount of water in the levain expressed as a
            percentage of the total flour in the levain.
          </small>
        </p>
      </main>
      <style jsx>
        {`
          .app-container {
            padding: 12px;
            max-width: 500px;
          }
          .popover-container {
            background-color: white;
            padding: 8px;
            border-radius: 5px;
          }
        `}
      </style>
    </>
  );
}
