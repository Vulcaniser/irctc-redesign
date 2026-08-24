/* ==========================================================================
   india-outline.js
   Purpose: The India boundary silhouette drawn by the journey map preview.

   PROVENANCE - read before changing this file:
   These points are NOT hand-traced, NOT copied from any design-reference
   image, and NOT derived from memory. They were extracted programmatically
   from the project's verified Wikimedia Commons railway-network SVG
   (assets/maps/india-railways-network.svg) via image-processing contour
   detection:
     1. The SVG was rendered to a high-resolution raster (2560x2800).
     2. The India-landmass fill color (pale cream, distinct from the grey
        neighboring-country fill and the light-blue ocean fill) was
        isolated as a binary mask.
     3. The single largest connected contour in that mask (~2.25M px^2,
        ~120x larger than the next-largest region) was extracted with
        OpenCV findContours + approxPolyDP (a standard Douglas-Peucker-
        style simplification), reducing ~14,200 raw contour points to
        172 while preserving the recognizable silhouette.
     4. Coordinates were scaled back from the 2560x2800 render to the
        1280x1400 coordinate space already used by geoToMap() in
        route-preview.js - so this outline lines up with the real
        station/route positions without needing its own transform.

   This is a silhouette approximation of India's mainland outline (minor
   offshore islands were dropped as separate, much smaller contours) - it
   is suitable for an illustrative visualization, not for any purpose
   requiring precise cartographic/legal boundary accuracy.

   Points are already in on-screen map units (same 1280x1400 space as
   geoToMap() output) - do NOT run these through geoToMap() again.
   ========================================================================== */

const INDIA_OUTLINE = [[293.0,19.0], [230.0,36.5], [206.5,69.0], [210.0,80.5], [258.0,96.5], [255.5,108.0], [274.0,118.0], [244.0,151.0], [256.0,222.5], [298.5,235.5], [298.5,253.0], [328.0,265.5], [292.5,289.0], [298.0,334.5], [273.0,348.0], [262.5,379.5], [242.0,383.0], [226.0,424.0], [197.0,444.0], [179.0,480.0], [129.0,493.5], [111.0,478.0], [79.0,520.0], [76.5,536.5], [105.5,546.0], [104.0,579.5], [126.0,584.5], [143.5,650.0], [97.0,661.5], [45.0,657.0], [21.0,685.5], [37.0,677.0], [40.5,704.5], [70.0,721.0], [120.0,708.5], [95.5,748.5], [54.5,749.0], [128.5,817.5], [184.0,797.0], [188.5,744.5], [223.0,747.0], [206.0,762.5], [219.0,774.0], [210.0,793.0], [221.5,793.5], [222.5,839.5], [247.0,835.0], [244.0,862.5], [217.5,863.0], [230.5,885.0], [225.5,935.5], [246.5,1029.5], [287.5,1096.5], [310.0,1183.0], [360.5,1284.0], [378.0,1293.0], [371.0,1320.0], [383.5,1345.5], [422.0,1375.0], [441.5,1363.0], [451.5,1336.0], [476.0,1326.5], [496.0,1279.0], [517.5,1282.0], [512.0,1222.0], [534.0,1174.5], [526.0,1156.0], [538.5,1149.5], [524.0,1138.0], [534.0,1131.5], [527.0,1051.0], [538.5,1038.5], [569.5,1036.5], [581.5,1013.5], [619.5,1006.5], [619.5,980.5], [697.0,929.0], [754.0,855.0], [767.5,863.0], [793.5,854.5], [820.0,822.5], [819.0,791.0], [865.0,765.0], [854.0,740.0], [866.5,738.5], [882.0,772.5], [899.0,754.0], [898.5,773.0], [910.0,775.5], [903.5,705.0], [887.5,713.5], [892.0,744.5], [870.0,736.5], [881.5,694.5], [895.5,694.5], [895.0,655.5], [871.5,656.0], [862.5,628.5], [903.5,609.0], [870.0,584.0], [881.0,537.5], [902.0,557.5], [915.0,552.0], [922.0,569.0], [944.0,566.0], [946.5,604.5], [1039.0,609.0], [1060.5,622.5], [1034.5,661.5], [1012.0,665.0], [1004.5,688.5], [1024.5,713.0], [1033.5,681.5], [1049.0,679.0], [1064.0,751.5], [1078.5,756.0], [1096.0,704.5], [1093.5,663.0], [1129.0,669.0], [1151.5,618.5], [1146.5,603.5], [1169.0,571.5], [1170.0,542.0], [1215.5,510.0], [1246.5,509.0], [1263.5,466.5], [1220.0,459.5], [1231.0,438.0], [1213.5,434.0], [1212.0,410.0], [1186.0,428.0], [1149.0,416.0], [1092.0,448.0], [1065.5,483.5], [1024.0,491.0], [1043.5,508.5], [1041.0,534.0], [910.0,535.5], [897.5,519.0], [900.5,477.0], [874.5,481.0], [874.5,553.5], [837.5,560.0], [771.0,545.5], [765.0,534.5], [748.0,539.0], [701.0,503.5], [665.5,511.0], [614.0,485.0], [588.0,485.0], [524.5,437.0], [538.5,389.5], [560.0,366.0], [503.0,334.5], [486.0,311.5], [469.5,315.0], [453.0,255.5], [472.5,246.0], [484.5,258.0], [500.5,245.0], [470.5,187.0], [480.5,195.5], [476.5,178.0], [501.0,174.0], [502.5,155.0], [527.0,142.0], [538.5,100.0], [525.5,103.5], [495.0,74.0], [448.5,90.5], [438.0,113.5], [325.5,25.0]];

window.INDIA_OUTLINE = INDIA_OUTLINE;
