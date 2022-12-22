import { setManifest } from '@angular-architects/module-federation';
import { CustomManifest } from './app/model/mf.model';


// Step1: During pod start, replace /assets/mf.manifest.json contents with the k8s configmap
// Step2: Load list of remote microfrontend into ? from mf.manifest.json file

const mfManifestJson = fetch('/assets/mf.manifest.json');

const parseConfig = async (mfManifest: Promise<Response>) => {
  const manifest: CustomManifest = await (await mfManifest).json();
  const filterManifest: CustomManifest = {};
  for (const key of Object.keys(manifest)) {
    const value = manifest[key];
    // check more details
    if (value.isActive === true) {
      filterManifest[key] = value;
    }
  }
  return filterManifest;
};

parseConfig(mfManifestJson)
  .then((data) => setManifest(data))
  .catch((err) => console.log(err))
  .then((_) => import('./bootstrap'))
  .catch((err) => console.log(err));