import { FilterCheckMark } from "./FilterCheckMark";

export function AccessibilityFeaturesSelector({ selectedFeatures, onChange }) {
    const features = { 'Guest entrance and parking': {'Step-free access':"Step-free access", 'Disabled parking':"Disabled parking spot", 'Wide entrance':"Guest entrance wider than 32 inches"},
                       'Bedroom': {'Step-free bedroom':"Step-free bedroom access", 'Wide bedroom enterance':"Bedroom entrance wider than 32 inches"},
                       'Bathroom': {'Step-free bathroom':"Step-free bathroom access", 'Wide bathroom enterance':"Bathroom entrance wider than 32 inches", 'Toilet grab bar':"Toilet grab bar", 'Shower grab bar':"Shower grab bar", 'Step-free shower':"Step-free shower", 'bath chair':"Shower or bath chair"},
                       'Adaptive equipment': {'Ceilling or mobile host':"Ceilling or mobile host"}}

    function handleFeatureToggle(feature) {
      if (selectedFeatures.includes(feature)) {
        onChange(selectedFeatures.filter((f) => f !== feature));
      } else {
        onChange([...selectedFeatures, feature]);
      }
    }

    //console.log(features);  

    return <>
        {Object.keys(features).map((category) => {
            //console.log("1-" + category, features[category]);
            return <div key={category} className="mb-4">
                <div className="font-medium text-md mb-2">{category}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.keys(features[category]).map((featureKey) => {
                        //console.log("2-" + featureKey, features[category][featureKey]);
                        return (
                            <div key={featureKey} className="flex items-center mt-1">
                                <FilterCheckMark isChecked={selectedFeatures.includes(featureKey)} onClick={() => handleFeatureToggle(featureKey)} />
                                <span className="ml-2">{features[category][featureKey]}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        })}
    </>
}