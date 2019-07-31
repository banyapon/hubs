function registerNetworkSchemas() {
  const vectorRequiresUpdate = epsilon => {
    return () => {
      let prev = null;

      return curr => {
        if (prev === null) {
          prev = new THREE.Vector3(curr.x, curr.y, curr.z);
          return true;
        } else if (!NAF.utils.almostEqualVec3(prev, curr, epsilon)) {
          prev.copy(curr);
          return true;
        }

        return false;
      };
    };
  };

  // Note: networked template ids are semantically important. We use the template suffix as a filter
  // for allowing and authorizing messages in reticulum.
  // See `spawn_permitted?` in https://github.com/mozilla/reticulum/blob/master/lib/ret_web/channels/hub_channel.ex

  // NAF schemas have been extended with a custom nonAuthorizedComponents property that is used to skip authorization
  // on certain components and properties regardless of hub or user permissions. See permissions-utils.js.

  NAF.schemas.add({
    template: "#remote-avatar",
    components: [
      {
        component: "position",
        requiresNetworkUpdate: vectorRequiresUpdate(0.001)
      },
      {
        component: "rotation",
        requiresNetworkUpdate: vectorRequiresUpdate(0.5)
      },
      "scale",
      "player-info",
      "networked-avatar",
      {
        selector: ".camera",
        component: "position",
        requiresNetworkUpdate: vectorRequiresUpdate(0.001)
      },
      {
        selector: ".camera",
        component: "rotation",
        requiresNetworkUpdate: vectorRequiresUpdate(0.5)
      },
      {
        selector: ".left-controller",
        component: "position",
        requiresNetworkUpdate: vectorRequiresUpdate(0.001)
      },
      {
        selector: ".left-controller",
        component: "rotation",
        requiresNetworkUpdate: vectorRequiresUpdate(0.5)
      },
      {
        selector: ".left-controller",
        component: "visible"
      },
      {
        selector: ".right-controller",
        component: "position",
        requiresNetworkUpdate: vectorRequiresUpdate(0.001)
      },
      {
        selector: ".right-controller",
        component: "rotation",
        requiresNetworkUpdate: vectorRequiresUpdate(0.5)
      },
      {
        selector: ".right-controller",
        component: "visible"
      }
    ]
  });

  NAF.schemas.add({
    template: "#interactable-media",
    components: [
      {
        component: "position",
        requiresNetworkUpdate: vectorRequiresUpdate(0.001)
      },
      {
        component: "rotation",
        requiresNetworkUpdate: vectorRequiresUpdate(0.5)
      },
      "scale",
      // TODO: Optimize checking mediaOptions with requiresNetworkUpdate.
      "media-loader",
      {
        component: "media-video",
        property: "time"
      },
      {
        component: "media-video",
        property: "videoPaused"
      },
      {
        component: "media-pdf",
        property: "index"
      },
      "pinnable"
    ],
    nonAuthorizedComponents: [
      {
        component: "media-video",
        property: "time"
      },
      {
        component: "media-video",
        property: "videoPaused"
      },
      {
        component: "media-pager",
        property: "index"
      }
    ]
  });

  NAF.schemas.add({
    template: "#static-media",
    components: [
      // TODO: Optimize checking mediaOptions with requiresNetworkUpdate.
      "media-loader",
      {
        component: "media-video",
        property: "time"
      }
    ],
    nonAuthorizedComponents: [
      {
        component: "media-video",
        property: "time"
      }
    ]
  });

  NAF.schemas.add({
    template: "#static-controlled-media",
    components: [
      // TODO: Optimize checking mediaOptions with requiresNetworkUpdate.
      "media-loader",
      {
        component: "media-video",
        property: "time"
      },
      {
        component: "media-video",
        property: "videoPaused"
      },
      {
        component: "media-pdf",
        property: "index"
      }
    ],
    nonAuthorizedComponents: [
      {
        component: "media-video",
        property: "time"
      },
      {
        component: "media-video",
        property: "videoPaused"
      },
      {
        component: "media-pager",
        property: "index"
      }
    ]
  });

  NAF.schemas.add({
    template: "#interactable-drawing",
    components: [
      {
        component: "position",
        requiresNetworkUpdate: vectorRequiresUpdate(0.001)
      },
      {
        component: "rotation",
        requiresNetworkUpdate: vectorRequiresUpdate(0.5)
      },
      "scale",
      "networked-drawing"
    ]
  });

  NAF.schemas.add({
    template: "#interactable-camera",
    components: [
      "position",
      "rotation",
      {
        component: "camera-tool",
        property: "isSnapping"
      },
      {
        component: "camera-tool",
        property: "isRecording"
      },
      {
        component: "camera-tool",
        property: "label"
      }
    ]
  });

  NAF.schemas.add({
    template: "#interactable-pen",
    components: [
      {
        component: "position",
        requiresNetworkUpdate: vectorRequiresUpdate(0.001)
      },
      {
        component: "rotation",
        requiresNetworkUpdate: vectorRequiresUpdate(0.5)
      },
      "scale",
      "media-loader",
      {
        selector: "#pen",
        component: "pen",
        property: "radius"
      },
      {
        selector: "#pen",
        component: "pen",
        property: "color"
      }
    ]
  });
}

export default registerNetworkSchemas;
