<script setup lang="ts">
import { onMounted, ref } from "vue";

import {
  database,
  set,
  onValue,
  ref as firebaseRef,
  update,
} from "./config/firebase";

import {
  BuildingCityTown,
  SingleUserAddPlus,
  ChevronRight,
  Document,
} from "./components/icons";

const dialog = ref(true);
const data = ref({
  customer_increase: 0,
  digital_certificates_expire_soon: 0,
  expired_digital_certificates: 0,
  integrated_digital_certificates: 0,
});
const customersCount = ref(0);

onMounted(async () => {
  fetchAll();

  const customersRef = firebaseRef(database, "customers");

  onValue(
    customersRef,
    (snapshot) => {
      const data = snapshot.val();
      if (data) {
        customersCount.value = Object.keys(data).length;
      }
    },
    {
      onlyOnce: false,
    }
  );
});

const fetchAll = () => {
  const dataRef = firebaseRef(database, "data");

  onValue(
    dataRef,
    (snapshot) => {
      const firebaseData = snapshot.val();

      if (firebaseData) {
        data.value = firebaseData;
      }
    },
    {
      onlyOnce: false,
    }
  );
};

const accCustomer = () => {
  const customerRef = firebaseRef(database, "customers/" + Date.now());

  set(customerRef, {
    name: "John Doe",
    email: "email@example.com",
    createdAt: Date.now(),
  });
};

const accDocument = () => {
  const dataRef = firebaseRef(database, "data");

  onValue(
    dataRef,
    (snapshot) => {
      const data = snapshot.val();

      if (data && data.integrated_digital_certificates !== undefined) {
        update(dataRef, {
          integrated_digital_certificates:
            (data.integrated_digital_certificates || 0) + 1,
        });
      }
    },
    {
      onlyOnce: true,
    }
  );
};
</script>

<template>
  <v-dialog width="auto" v-model="dialog">
    <div class="container">
      <header>
        <h1>Clientes</h1>
      </header>

      <div class="customers-container">
        <div class="registered-customers-container">
          <span class="title">Clientes cadastrados</span>

          <div class="count-container">
            <BuildingCityTown class="icon" />
            <span class="count">{{ customersCount }}</span>

            <small v-if="data.customer_increase != 0">
              {{ data.customer_increase > 0 ? "+" : "-"
              }}{{ data.customer_increase }}
            </small>
          </div>
        </div>

        <div class="manage-customers-container" @click="accCustomer">
          <div class="icon-container">
            <SingleUserAddPlus class="icon" />
          </div>

          <div class="text-container">
            <span>Gerenciar clientes</span>

            <ChevronRight class="icon" />
          </div>
        </div>
      </div>

      <div class="digital-certificates-container">
        <h1>Certificados digitais</h1>

        <div class="digital-certificates-items">
          <div class="digital-certificates">
            <div class="item">
              <div class="dot green" />

              <span
                ><text>{{ data.integrated_digital_certificates }}</text>
                integrados</span
              >
            </div>
            <div class="item">
              <div class="dot yellow" />

              <span>
                <text>{{ data.digital_certificates_expire_soon }}</text> vencem
                em breve
              </span>
            </div>
            <div class="item">
              <div class="dot red" />

              <span
                ><text>{{ data.expired_digital_certificates }}</text>
                vencidos</span
              >
            </div>
          </div>

          <div class="certificate-manager" @click="accDocument">
            <div class="icon-container">
              <Document class="icon" />
            </div>

            <div class="text-container">
              <span>Gerenciar certificados</span>

              <ChevronRight class="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<style lang="scss" scoped>
.container {
  width: 540px;

  max-width: 90vw;
  max-height: 90vh;

  background: #fff;

  border-radius: 12px;
  padding: 40px;

  display: flex;
  flex-direction: column;
  gap: 24px;

  header {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    h1 {
      font-family: "Poppins", sans-serif;
      font-size: 1.5rem;
      line-height: 2rem;
      color: #1e293b;
    }
  }

  .customers-container {
    display: flex;
    gap: 16px;

    .registered-customers-container,
    .manage-customers-container {
      flex: 1;
      border-radius: 8px;
      height: 84px;

      padding: 0 20px;

      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .registered-customers-container {
      background: #f8fafc;
      gap: 4px;

      span {
        font-family: "Poppins", sans-serif;
        font-size: 0.875rem;
        color: #475569;
      }

      .count-container {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 4px;

        .icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .count {
          font-family: "Poppins", sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: #1e293b;
        }

        small {
          font-family: "Poppins", sans-serif;
          font-size: 0.675rem;
          font-weight: 600;
          color: #068373;

          margin-bottom: 2px;
        }
      }
    }

    .manage-customers-container {
      background: #e2e8f0;
      gap: 8px;

      cursor: pointer;

      .icon-container {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .icon {
          width: 2rem;
          height: 2rem;
        }
      }

      .text-container {
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
          font-family: "Poppins", sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: #475569;
        }

        .icon {
          height: 0.875rem;
        }
      }
    }
  }

  .digital-certificates-container {
    display: flex;
    flex-direction: column;
    gap: 4px;

    h1 {
      font-family: "Poppins", sans-serif;
      font-size: 1.25rem;
      line-height: 1.5rem;
      color: #1e293b;
    }

    .digital-certificates-items {
      display: flex;
      gap: 16px;

      .digital-certificates,
      .certificate-manager {
        flex: 1;

        border-radius: 8px;
        height: 84px;

        padding: 0 20px;

        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .digital-certificates {
        background: #f8fafc;
        gap: 4px;

        .item {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 8px;

          .dot {
            border-radius: 50%;
            width: 5px;
            height: 5px;

            &.green {
              background: #2fb490;
            }

            &.yellow {
              background: #e8bb34;
            }

            &.red {
              background: #ef4444;
            }
          }

          span {
            font-family: "Poppins", sans-serif;
            font-size: 0.75rem;
            color: #475569;
            font-weight: 400;

            text {
              font-weight: 600;
            }
          }
        }
      }

      .certificate-manager {
        background: #e2e8f0;
        gap: 8px;

        cursor: pointer;

        .icon-container {
          display: flex;
          align-items: center;
          justify-content: flex-start;

          .icon {
            width: 2rem;
            height: 2rem;
          }
        }

        .text-container {
          display: flex;
          align-items: center;
          justify-content: space-between;

          span {
            font-family: "Poppins", sans-serif;
            font-size: 0.875rem;
            font-weight: 600;
            color: #475569;
          }

          .icon {
            height: 0.875rem;
          }
        }
      }
    }
  }
}
</style>
